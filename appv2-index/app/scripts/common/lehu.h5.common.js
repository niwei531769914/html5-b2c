var Zepto = function () {
    function e(e) {
        return null == e ? String(e) : V[$.call(e)] || "object"
    }

    function t(t) {
        return "function" == e(t)
    }

    function n(e) {
        return null != e && e == e.window
    }

    function r(e) {
        return null != e && e.nodeType == e.DOCUMENT_NODE
    }

    function i(t) {
        return "object" == e(t)
    }

    function s(e) {
        return i(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype
    }

    function o(e) {
        return "number" == typeof e.length
    }

    function u(e) {
        return A.call(e, function (e) {
            return null != e
        })
    }

    function a(e) {
        return e.length > 0 ? x.fn.concat.apply([], e) : e
    }

    function f(e) {
        return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function l(e) {
        return e in _ ? _[e] : _[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
    }

    function c(e, t) {
        return "number" != typeof t || D[f(e)] ? t : t + "px"
    }

    function h(e) {
        var t, n;
        return M[e] || (t = O.createElement(e), O.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == n && (n = "block"), M[e] = n), M[e]
    }

    function p(e) {
        return "children"in e ? L.call(e.children) : x.map(e.childNodes, function (e) {
            return 1 == e.nodeType ? e : void 0
        })
    }

    function d(e, t, n) {
        for (S in t)n && (s(t[S]) || G(t[S])) ? (s(t[S]) && !s(e[S]) && (e[S] = {}), G(t[S]) && !G(e[S]) && (e[S] = []), d(e[S], t[S], n)) : t[S] !== E && (e[S] = t[S])
    }

    function v(e, t) {
        return null == t ? x(e) : x(e).filter(t)
    }

    function m(e, n, r, i) {
        return t(n) ? n.call(e, r, i) : n
    }

    function g(e, t, n) {
        null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
    }

    function y(e, t) {
        var n = e.className || "", r = n && n.baseVal !== E;
        return t === E ? r ? n.baseVal : n : void (r ? n.baseVal = t : e.className = t)
    }

    function b(e) {
        try {
            return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null : +e + "" == e ? +e : /^[\[\{]/.test(e) ? x.parseJSON(e) : e) : e
        } catch (t) {
            return e
        }
    }

    function w(e, t) {
        t(e);
        for (var n = 0, r = e.childNodes.length; r > n; n++)w(e.childNodes[n], t)
    }

    var E, S, x, T, N, C, k = [], L = k.slice, A = k.filter, O = window.document, M = {}, _ = {}, D = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, P = /^\s*<(\w+|!)[^>]*>/, H = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, B = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, j = /^(?:body|html)$/i, F = /([A-Z])/g, I = ["val", "css", "html", "text", "data", "width", "height", "offset"], q = ["after", "prepend", "before", "append"], R = O.createElement("table"), U = O.createElement("tr"), z = {
        tr: O.createElement("tbody"),
        tbody: R,
        thead: R,
        tfoot: R,
        td: U,
        th: U,
        "*": O.createElement("div")
    }, W = /complete|loaded|interactive/, X = /^[\w-]*$/, V = {}, $ = V.toString, J = {}, K = O.createElement("div"), Q = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    }, G = Array.isArray || function (e) {
            return e instanceof Array
        };
    return J.matches = function (e, t) {
        if (!t || !e || 1 !== e.nodeType)return !1;
        var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
        if (n)return n.call(e, t);
        var r, i = e.parentNode, s = !i;
        return s && (i = K).appendChild(e), r = ~J.qsa(i, t).indexOf(e), s && K.removeChild(e), r
    }, N = function (e) {
        return e.replace(/-+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : ""
        })
    }, C = function (e) {
        return A.call(e, function (t, n) {
            return e.indexOf(t) == n
        })
    }, J.fragment = function (e, t, n) {
        var r, i, o;
        return H.test(e) && (r = x(O.createElement(RegExp.$1))), r || (e.replace && (e = e.replace(B, "<$1></$2>")), t === E && (t = P.test(e) && RegExp.$1), t in z || (t = "*"), o = z[t], o.innerHTML = "" + e, r = x.each(L.call(o.childNodes), function () {
            o.removeChild(this)
        })), s(n) && (i = x(r), x.each(n, function (e, t) {
            I.indexOf(e) > -1 ? i[e](t) : i.attr(e, t)
        })), r
    }, J.Z = function (e, t) {
        return e = e || [], e.__proto__ = x.fn, e.selector = t || "", e
    }, J.isZ = function (e) {
        return e instanceof J.Z
    }, J.init = function (e, n) {
        var r;
        if (!e)return J.Z();
        if ("string" == typeof e)if (e = e.trim(), "<" == e[0] && P.test(e))r = J.fragment(e, RegExp.$1, n), e = null; else {
            if (n !== E)return x(n).find(e);
            r = J.qsa(O, e)
        } else {
            if (t(e))return x(O).ready(e);
            if (J.isZ(e))return e;
            if (G(e))r = u(e); else if (i(e))r = [e], e = null; else if (P.test(e))r = J.fragment(e.trim(), RegExp.$1, n), e = null; else {
                if (n !== E)return x(n).find(e);
                r = J.qsa(O, e)
            }
        }
        return J.Z(r, e)
    }, x = function (e, t) {
        return J.init(e, t)
    }, x.extend = function (e) {
        var t, n = L.call(arguments, 1);
        return "boolean" == typeof e && (t = e, e = n.shift()), n.forEach(function (n) {
            d(e, n, t)
        }), e
    }, J.qsa = function (e, t) {
        var n, i = "#" == t[0], s = !i && "." == t[0], o = i || s ? t.slice(1) : t, u = X.test(o);
        return r(e) && u && i ? (n = e.getElementById(o)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : L.call(u && !i ? s ? e.getElementsByClassName(o) : e.getElementsByTagName(t) : e.querySelectorAll(t))
    }, x.contains = O.documentElement.contains ? function (e, t) {
        return e !== t && e.contains(t)
    } : function (e, t) {
        for (; t && (t = t.parentNode);)if (t === e)return !0;
        return !1
    }, x.type = e, x.isFunction = t, x.isWindow = n, x.isArray = G, x.isPlainObject = s, x.isEmptyObject = function (e) {
        var t;
        for (t in e)return !1;
        return !0
    }, x.inArray = function (e, t, n) {
        return k.indexOf.call(t, e, n)
    }, x.camelCase = N, x.trim = function (e) {
        return null == e ? "" : String.prototype.trim.call(e)
    }, x.uuid = 0, x.support = {}, x.expr = {}, x.map = function (e, t) {
        var n, r, i, s = [];
        if (o(e))for (r = 0; r < e.length; r++)n = t(e[r], r), null != n && s.push(n); else for (i in e)n = t(e[i], i), null != n && s.push(n);
        return a(s)
    }, x.each = function (e, t) {
        var n, r;
        if (o(e)) {
            for (n = 0; n < e.length; n++)if (t.call(e[n], n, e[n]) === !1)return e
        } else for (r in e)if (t.call(e[r], r, e[r]) === !1)return e;
        return e
    }, x.grep = function (e, t) {
        return A.call(e, t)
    }, window.JSON && (x.parseJSON = JSON.parse), x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        V["[object " + t + "]"] = t.toLowerCase()
    }), x.fn = {
        forEach: k.forEach,
        reduce: k.reduce,
        push: k.push,
        sort: k.sort,
        indexOf: k.indexOf,
        concat: k.concat,
        map: function (e) {
            return x(x.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function () {
            return x(L.apply(this, arguments))
        },
        ready: function (e) {
            return W.test(O.readyState) && O.body ? e(x) : O.addEventListener("DOMContentLoaded", function () {
                e(x)
            }, !1), this
        },
        get: function (e) {
            return e === E ? L.call(this) : this[e >= 0 ? e : e + this.length]
        },
        toArray: function () {
            return this.get()
        },
        size: function () {
            return this.length
        },
        remove: function () {
            return this.each(function () {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function (e) {
            return k.every.call(this, function (t, n) {
                return e.call(t, n, t) !== !1
            }), this
        },
        filter: function (e) {
            return t(e) ? this.not(this.not(e)) : x(A.call(this, function (t) {
                return J.matches(t, e)
            }))
        },
        add: function (e, t) {
            return x(C(this.concat(x(e, t))))
        },
        is: function (e) {
            return this.length > 0 && J.matches(this[0], e)
        },
        not: function (e) {
            var n = [];
            if (t(e) && e.call !== E)this.each(function (t) {
                e.call(this, t) || n.push(this)
            }); else {
                var r = "string" == typeof e ? this.filter(e) : o(e) && t(e.item) ? L.call(e) : x(e);
                this.forEach(function (e) {
                    r.indexOf(e) < 0 && n.push(e)
                })
            }
            return x(n)
        },
        has: function (e) {
            return this.filter(function () {
                return i(e) ? x.contains(this, e) : x(this).find(e).size()
            })
        },
        eq: function (e) {
            return -1 === e ? this.slice(e) : this.slice(e, +e + 1)
        },
        first: function () {
            var e = this[0];
            return e && !i(e) ? e : x(e)
        },
        last: function () {
            var e = this[this.length - 1];
            return e && !i(e) ? e : x(e)
        },
        find: function (e) {
            var t, n = this;
            return t = e ? "object" == typeof e ? x(e).filter(function () {
                var e = this;
                return k.some.call(n, function (t) {
                    return x.contains(t, e)
                })
            }) : 1 == this.length ? x(J.qsa(this[0], e)) : this.map(function () {
                return J.qsa(this, e)
            }) : x()
        },
        closest: function (e, t) {
            var n = this[0], i = !1;
            for ("object" == typeof e && (i = x(e)); n && !(i ? i.indexOf(n) >= 0 : J.matches(n, e));)n = n !== t && !r(n) && n.parentNode;
            return x(n)
        },
        parents: function (e) {
            for (var t = [], n = this; n.length > 0;)n = x.map(n, function (e) {
                return (e = e.parentNode) && !r(e) && t.indexOf(e) < 0 ? (t.push(e), e) : void 0
            });
            return v(t, e)
        },
        parent: function (e) {
            return v(C(this.pluck("parentNode")), e)
        },
        children: function (e) {
            return v(this.map(function () {
                return p(this)
            }), e)
        },
        contents: function () {
            return this.map(function () {
                return L.call(this.childNodes)
            })
        },
        siblings: function (e) {
            return v(this.map(function (e, t) {
                return A.call(p(t.parentNode), function (e) {
                    return e !== t
                })
            }), e)
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        pluck: function (e) {
            return x.map(this, function (t) {
                return t[e]
            })
        },
        show: function () {
            return this.each(function () {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
            })
        },
        replaceWith: function (e) {
            return this.before(e).remove()
        },
        wrap: function (e) {
            var n = t(e);
            if (this[0] && !n)var r = x(e).get(0), i = r.parentNode || this.length > 1;
            return this.each(function (t) {
                x(this).wrapAll(n ? e.call(this, t) : i ? r.cloneNode(!0) : r)
            })
        },
        wrapAll: function (e) {
            if (this[0]) {
                x(this[0]).before(e = x(e));
                for (var t; (t = e.children()).length;)e = t.first();
                x(e).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            var n = t(e);
            return this.each(function (t) {
                var r = x(this), i = r.contents(), s = n ? e.call(this, t) : e;
                i.length ? i.wrapAll(s) : r.append(s)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                x(this).replaceWith(x(this).children())
            }), this
        },
        clone: function () {
            return this.map(function () {
                return this.cloneNode(!0)
            })
        },
        hide: function () {
            return this.css("display", "none")
        },
        toggle: function (e) {
            return this.each(function () {
                var t = x(this);
                (e === E ? "none" == t.css("display") : e) ? t.show() : t.hide()
            })
        },
        prev: function (e) {
            return x(this.pluck("previousElementSibling")).filter(e || "*")
        },
        next: function (e) {
            return x(this.pluck("nextElementSibling")).filter(e || "*")
        },
        html: function (e) {
            return 0 in arguments ? this.each(function (t) {
                var n = this.innerHTML;
                x(this).empty().append(m(this, e, t, n))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function (e) {
            return 0 in arguments ? this.each(function (t) {
                var n = m(this, e, t, this.textContent);
                this.textContent = null == n ? "" : "" + n
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function (e, t) {
            var n;
            return "string" != typeof e || 1 in arguments ? this.each(function (n) {
                if (1 === this.nodeType)if (i(e))for (S in e)g(this, S, e[S]); else g(this, e, m(this, t, n, this.getAttribute(e)))
            }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n : E
        },
        removeAttr: function (e) {
            return this.each(function () {
                1 === this.nodeType && e.split(" ").forEach(function (e) {
                    g(this, e)
                }, this)
            })
        },
        prop: function (e, t) {
            return e = Q[e] || e, 1 in arguments ? this.each(function (n) {
                this[e] = m(this, t, n, this[e])
            }) : this[0] && this[0][e]
        },
        data: function (e, t) {
            var n = "data-" + e.replace(F, "-$1").toLowerCase(), r = 1 in arguments ? this.attr(n, t) : this.attr(n);
            return null !== r ? b(r) : E
        },
        val: function (e) {
            return 0 in arguments ? this.each(function (t) {
                this.value = m(this, e, t, this.value)
            }) : this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function () {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function (e) {
            if (e)return this.each(function (t) {
                var n = x(this), r = m(this, e, t, n.offset()), i = n.offsetParent().offset(), s = {
                    top: r.top - i.top,
                    left: r.left - i.left
                };
                "static" == n.css("position") && (s.position = "relative"), n.css(s)
            });
            if (!this.length)return null;
            var t = this[0].getBoundingClientRect();
            return {
                left: t.left + window.pageXOffset,
                top: t.top + window.pageYOffset,
                width: Math.round(t.width),
                height: Math.round(t.height)
            }
        },
        css: function (t, n) {
            if (arguments.length < 2) {
                var r, i = this[0];
                if (!i)return;
                if (r = getComputedStyle(i, ""), "string" == typeof t)return i.style[N(t)] || r.getPropertyValue(t);
                if (G(t)) {
                    var s = {};
                    return x.each(t, function (e, t) {
                        s[t] = i.style[N(t)] || r.getPropertyValue(t)
                    }), s
                }
            }
            var o = "";
            if ("string" == e(t))n || 0 === n ? o = f(t) + ":" + c(t, n) : this.each(function () {
                this.style.removeProperty(f(t))
            }); else for (S in t)t[S] || 0 === t[S] ? o += f(S) + ":" + c(S, t[S]) + ";" : this.each(function () {
                this.style.removeProperty(f(S))
            });
            return this.each(function () {
                this.style.cssText += ";" + o
            })
        },
        index: function (e) {
            return e ? this.indexOf(x(e)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function (e) {
            return e ? k.some.call(this, function (e) {
                return this.test(y(e))
            }, l(e)) : !1
        },
        addClass: function (e) {
            return e ? this.each(function (t) {
                if ("className"in this) {
                    T = [];
                    var n = y(this), r = m(this, e, t, n);
                    r.split(/\s+/g).forEach(function (e) {
                        x(this).hasClass(e) || T.push(e)
                    }, this), T.length && y(this, n + (n ? " " : "") + T.join(" "))
                }
            }) : this
        },
        removeClass: function (e) {
            return this.each(function (t) {
                if ("className"in this) {
                    if (e === E)return y(this, "");
                    T = y(this), m(this, e, t, T).split(/\s+/g).forEach(function (e) {
                        T = T.replace(l(e), " ")
                    }), y(this, T.trim())
                }
            })
        },
        toggleClass: function (e, t) {
            return e ? this.each(function (n) {
                var r = x(this), i = m(this, e, n, y(this));
                i.split(/\s+/g).forEach(function (e) {
                    (t === E ? !r.hasClass(e) : t) ? r.addClass(e) : r.removeClass(e)
                })
            }) : this
        },
        scrollTop: function (e) {
            if (this.length) {
                var t = "scrollTop"in this[0];
                return e === E ? t ? this[0].scrollTop : this[0].pageYOffset : this.each(t ? function () {
                    this.scrollTop = e
                } : function () {
                    this.scrollTo(this.scrollX, e)
                })
            }
        },
        scrollLeft: function (e) {
            if (this.length) {
                var t = "scrollLeft"in this[0];
                return e === E ? t ? this[0].scrollLeft : this[0].pageXOffset : this.each(t ? function () {
                    this.scrollLeft = e
                } : function () {
                    this.scrollTo(e, this.scrollY)
                })
            }
        },
        position: function () {
            if (this.length) {
                var e = this[0], t = this.offsetParent(), n = this.offset(), r = j.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
                return n.top -= parseFloat(x(e).css("margin-top")) || 0, n.left -= parseFloat(x(e).css("margin-left")) || 0, r.top += parseFloat(x(t[0]).css("border-top-width")) || 0, r.left += parseFloat(x(t[0]).css("border-left-width")) || 0, {
                    top: n.top - r.top,
                    left: n.left - r.left
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || O.body; e && !j.test(e.nodeName) && "static" == x(e).css("position");)e = e.offsetParent;
                return e
            })
        }
    }, x.fn.detach = x.fn.remove, ["width", "height"].forEach(function (e) {
        var t = e.replace(/./, function (e) {
            return e[0].toUpperCase()
        });
        x.fn[e] = function (i) {
            var s, o = this[0];
            return i === E ? n(o) ? o["inner" + t] : r(o) ? o.documentElement["scroll" + t] : (s = this.offset()) && s[e] : this.each(function (t) {
                o = x(this), o.css(e, m(this, i, t, o[e]()))
            })
        }
    }), q.forEach(function (t, n) {
        var r = n % 2;
        x.fn[t] = function () {
            var t, i, s = x.map(arguments, function (n) {
                return t = e(n), "object" == t || "array" == t || null == n ? n : J.fragment(n)
            }), o = this.length > 1;
            return s.length < 1 ? this : this.each(function (e, t) {
                i = r ? t : t.parentNode, t = 0 == n ? t.nextSibling : 1 == n ? t.firstChild : 2 == n ? t : null;
                var u = x.contains(O.documentElement, i);
                s.forEach(function (e) {
                    if (o)e = e.cloneNode(!0); else if (!i)return x(e).remove();
                    i.insertBefore(e, t), u && w(e, function (e) {
                        null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || window.eval.call(window, e.innerHTML)
                    })
                })
            })
        }, x.fn[r ? t + "To" : "insert" + (n ? "Before" : "After")] = function (e) {
            return x(e)[t](this), this
        }
    }), J.Z.prototype = x.fn, J.uniq = C, J.deserializeValue = b, x.zepto = J, x
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (e) {
    function t(e) {
        return e._zid || (e._zid = h++)
    }

    function n(e, n, s, o) {
        if (n = r(n), n.ns)var u = i(n.ns);
        return (m[t(e)] || []).filter(function (e) {
            return e && (!n.e || e.e == n.e) && (!n.ns || u.test(e.ns)) && (!s || t(e.fn) === t(s)) && (!o || e.sel == o)
        })
    }

    function r(e) {
        var t = ("" + e).split(".");
        return {e: t[0], ns: t.slice(1).sort().join(" ")}
    }

    function i(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }

    function s(e, t) {
        return e.del && !y && e.e in b || !!t
    }

    function o(e) {
        return w[e] || y && b[e] || e
    }

    function u(n, i, u, a, l, h, p) {
        var d = t(n), v = m[d] || (m[d] = []);
        i.split(/\s/).forEach(function (t) {
            if ("ready" == t)return e(document).ready(u);
            var i = r(t);
            i.fn = u, i.sel = l, i.e in w && (u = function (t) {
                var n = t.relatedTarget;
                return !n || n !== this && !e.contains(this, n) ? i.fn.apply(this, arguments) : void 0
            }), i.del = h;
            var d = h || u;
            i.proxy = function (e) {
                if (e = f(e), !e.isImmediatePropagationStopped()) {
                    e.data = a;
                    var t = d.apply(n, e._args == c ? [e] : [e].concat(e._args));
                    return t === !1 && (e.preventDefault(), e.stopPropagation()), t
                }
            }, i.i = v.length, v.push(i), "addEventListener"in n && n.addEventListener(o(i.e), i.proxy, s(i, p))
        })
    }

    function a(e, r, i, u, a) {
        var f = t(e);
        (r || "").split(/\s/).forEach(function (t) {
            n(e, t, i, u).forEach(function (t) {
                delete m[f][t.i], "removeEventListener"in e && e.removeEventListener(o(t.e), t.proxy, s(t, a))
            })
        })
    }

    function f(t, n) {
        return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(T, function (e, r) {
            var i = n[e];
            t[e] = function () {
                return this[r] = E, i && i.apply(n, arguments)
            }, t[r] = S
        }), (n.defaultPrevented !== c ? n.defaultPrevented : "returnValue"in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = E)), t
    }

    function l(e) {
        var t, n = {originalEvent: e};
        for (t in e)x.test(t) || e[t] === c || (n[t] = e[t]);
        return f(n, e)
    }

    var c, h = 1, p = Array.prototype.slice, d = e.isFunction, v = function (e) {
        return "string" == typeof e
    }, m = {}, g = {}, y = "onfocusin"in window, b = {focus: "focusin", blur: "focusout"}, w = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", e.event = {
        add: u,
        remove: a
    }, e.proxy = function (n, r) {
        var i = 2 in arguments && p.call(arguments, 2);
        if (d(n)) {
            var s = function () {
                return n.apply(r, i ? i.concat(p.call(arguments)) : arguments)
            };
            return s._zid = t(n), s
        }
        if (v(r))return i ? (i.unshift(n[r], n), e.proxy.apply(null, i)) : e.proxy(n[r], n);
        throw new TypeError("expected function")
    }, e.fn.bind = function (e, t, n) {
        return this.on(e, t, n)
    }, e.fn.unbind = function (e, t) {
        return this.off(e, t)
    }, e.fn.one = function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    };
    var E = function () {
        return !0
    }, S = function () {
        return !1
    }, x = /^([A-Z]|returnValue$|layer[XY]$)/, T = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    e.fn.delegate = function (e, t, n) {
        return this.on(t, e, n)
    }, e.fn.undelegate = function (e, t, n) {
        return this.off(t, e, n)
    }, e.fn.live = function (t, n) {
        return e(document.body).delegate(this.selector, t, n), this
    }, e.fn.die = function (t, n) {
        return e(document.body).undelegate(this.selector, t, n), this
    }, e.fn.on = function (t, n, r, i, s) {
        var o, f, h = this;
        return t && !v(t) ? (e.each(t, function (e, t) {
            h.on(e, n, r, t, s)
        }), h) : (v(n) || d(i) || i === !1 || (i = r, r = n, n = c), (d(r) || r === !1) && (i = r, r = c), i === !1 && (i = S), h.each(function (c, h) {
            s && (o = function (e) {
                return a(h, e.type, i), i.apply(this, arguments)
            }), n && (f = function (t) {
                var r, s = e(t.target).closest(n, h).get(0);
                return s && s !== h ? (r = e.extend(l(t), {
                    currentTarget: s,
                    liveFired: h
                }), (o || i).apply(s, [r].concat(p.call(arguments, 1)))) : void 0
            }), u(h, t, i, r, n, f || o)
        }))
    }, e.fn.off = function (t, n, r) {
        var i = this;
        return t && !v(t) ? (e.each(t, function (e, t) {
            i.off(e, n, t)
        }), i) : (v(n) || d(r) || r === !1 || (r = n, n = c), r === !1 && (r = S), i.each(function () {
            a(this, t, r, n)
        }))
    }, e.fn.trigger = function (t, n) {
        return t = v(t) || e.isPlainObject(t) ? e.Event(t) : f(t), t._args = n, this.each(function () {
            t.type in b && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent"in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
        })
    }, e.fn.triggerHandler = function (t, r) {
        var i, s;
        return this.each(function (o, u) {
            i = l(v(t) ? e.Event(t) : t), i._args = r, i.target = u, e.each(n(u, t.type || t), function (e, t) {
                return s = t.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), s
    }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (t) {
        e.fn[t] = function (e) {
            return 0 in arguments ? this.bind(t, e) : this.trigger(t)
        }
    }), e.Event = function (e, t) {
        v(e) || (t = e, e = t.type);
        var n = document.createEvent(g[e] || "Events"), r = !0;
        if (t)for (var i in t)"bubbles" == i ? r = !!t[i] : n[i] = t[i];
        return n.initEvent(e, r, !0), f(n)
    }
}(Zepto), function (t) {
    function h(e, n, r) {
        var i = t.Event(n);
        return t(e).trigger(i, r), !i.isDefaultPrevented()
    }

    function p(e, t, r, i) {
        return e.global ? h(t || n, r, i) : void 0
    }

    function d(e) {
        e.global && 0 === t.active++ && p(e, null, "ajaxStart")
    }

    function m(e) {
        e.global && !--t.active && p(e, null, "ajaxStop")
    }

    function g(e, t) {
        var n = t.context;
        return t.beforeSend.call(n, e, t) === !1 || p(t, n, "ajaxBeforeSend", [e, t]) === !1 ? !1 : void p(t, n, "ajaxSend", [e, t])
    }

    function v(e, t, n, r) {
        var i = n.context, s = "success";
        n.success.call(i, e, s, t), r && r.resolveWith(i, [e, s, t]), p(n, i, "ajaxSuccess", [t, n, e]), w(s, t, n)
    }

    function y(e, t, n, r, i) {
        var s = r.context;
        r.error.call(s, n, t, e), i && i.rejectWith(s, [n, t, e]), p(r, s, "ajaxError", [n, r, e || t]), w(t, n, r)
    }

    function w(e, t, n) {
        var r = n.context;
        n.complete.call(r, t, e), p(n, r, "ajaxComplete", [t, n]), m(n)
    }

    function b() {
    }

    function x(e) {
        return e && (e = e.split(";", 2)[0]), e && (e == f ? "html" : e == u ? "json" : a.test(e) ? "script" : s.test(e) && "xml") || "text"
    }

    function E(e, t) {
        return "" == t ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
    }

    function T(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = E(e.url, e.data), e.data = void 0)
    }

    function S(e, n, r, i) {
        return t.isFunction(n) && (i = r, r = n, n = void 0), t.isFunction(r) || (i = r, r = void 0), {
            url: e,
            data: n,
            success: r,
            dataType: i
        }
    }

    function C(e, n, r, i) {
        var s, o = t.isArray(n), u = t.isPlainObject(n);
        t.each(n, function (n, f) {
            s = t.type(f), i && (n = r ? i : i + "[" + (u || "object" == s || "array" == s ? n : "") + "]"), !i && o ? e.add(f.name, f.value) : "array" == s || !r && "object" == s ? C(e, f, r, n) : e.add(n, f)
        })
    }

    var i, r, e = 0, n = window.document, o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, a = /^(?:text|application)\/javascript/i, s = /^(?:text|application)\/xml/i, u = "application/json", f = "text/html", c = /^\s*$/, l = n.createElement("a");
    l.href = window.location.href, t.active = 0, t.ajaxJSONP = function (r, i) {
        if ("type"in r) {
            var s, o, u = r.jsonpCallback, a = (t.isFunction(u) ? u() : u) || "jsonp" + ++e, f = n.createElement("script"), l = window[a], c = function (e) {
                t(f).triggerHandler("error", e || "abort")
            }, h = {abort: c};
            return i && i.promise(h), t(f).on("load error", function (e, n) {
                clearTimeout(o), t(f).off().remove(), "error" != e.type && s ? v(s[0], h, r, i) : y(null, n || "error", h, r, i), window[a] = l, s && t.isFunction(l) && l(s[0]), l = s = void 0
            }), g(h, r) === !1 ? (c("abort"), h) : (window[a] = function () {
                s = arguments
            }, f.src = r.url.replace(/\?(.+)=\?/, "?$1=" + a), n.head.appendChild(f), r.timeout > 0 && (o = setTimeout(function () {
                c("timeout")
            }, r.timeout)), h)
        }
        return t.ajax(r)
    }, t.ajaxSettings = {
        type: "GET",
        beforeSend: b,
        success: b,
        error: b,
        complete: b,
        context: null,
        global: !0,
        xhr: function () {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: u,
            xml: "application/xml, text/xml",
            html: f,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, t.ajax = function (e) {
        var s, o = t.extend({}, e || {}), a = t.Deferred && t.Deferred();
        for (i in t.ajaxSettings)void 0 === o[i] && (o[i] = t.ajaxSettings[i]);
        d(o), o.crossDomain || (s = n.createElement("a"), s.href = o.url, s.href = s.href, o.crossDomain = l.protocol + "//" + l.host != s.protocol + "//" + s.host), o.url || (o.url = window.location.toString()), T(o);
        var u = o.dataType, f = /\?.+=\?/.test(o.url);
        if (f && (u = "jsonp"), o.cache !== !1 && (e && e.cache === !0 || "script" != u && "jsonp" != u) || (o.url = E(o.url, "_=" + Date.now())), "jsonp" == u)return f || (o.url = E(o.url, o.jsonp ? o.jsonp + "=?" : o.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(o, a);
        var C, h = o.accepts[u], p = {}, m = function (e, t) {
            p[e.toLowerCase()] = [e, t]
        }, w = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : window.location.protocol, S = o.xhr(), j = S.setRequestHeader;
        if (a && a.promise(S), o.crossDomain || m("X-Requested-With", "XMLHttpRequest"), m("Accept", h || "*/*"), (h = o.mimeType || h) && (h.indexOf(",") > -1 && (h = h.split(",", 2)[0]), S.overrideMimeType && S.overrideMimeType(h)), (o.contentType || o.contentType !== !1 && o.data && "GET" != o.type.toUpperCase()) && m("Content-Type", o.contentType || "application/x-www-form-urlencoded"), o.headers)for (r in o.headers)m(r, o.headers[r]);
        if (S.setRequestHeader = m, S.onreadystatechange = function () {
                if (4 == S.readyState) {
                    S.onreadystatechange = b, clearTimeout(C);
                    var e, n = !1;
                    if (S.status >= 200 && S.status < 300 || 304 == S.status || 0 == S.status && "file:" == w) {
                        u = u || x(o.mimeType || S.getResponseHeader("content-type")), e = S.responseText;
                        try {
                            "script" == u ? (1, eval)(e) : "xml" == u ? e = S.responseXML : "json" == u && (e = c.test(e) ? null : t.parseJSON(e))
                        } catch (i) {
                            n = i
                        }
                        n ? y(n, "parsererror", S, o, a) : v(e, S, o, a)
                    } else y(S.statusText || null, S.status ? "error" : "abort", S, o, a)
                }
            }, g(S, o) === !1)return S.abort(), y(null, "abort", S, o, a), S;
        if (o.xhrFields)for (r in o.xhrFields)S[r] = o.xhrFields[r];
        var O = "async"in o ? o.async : !0;
        S.open(o.type, o.url, O, o.username, o.password);
        for (r in p)j.apply(S, p[r]);
        return o.timeout > 0 && (C = setTimeout(function () {
            S.onreadystatechange = b, S.abort(), y(null, "timeout", S, o, a)
        }, o.timeout)), S.send(o.data ? o.data : null), S
    }, t.get = function () {
        return t.ajax(S.apply(null, arguments))
    }, t.post = function () {
        var e = S.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
    }, t.getJSON = function () {
        var e = S.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function (e, n, r) {
        if (!this.length)return this;
        var i, s = this, u = e.split(/\s/), a = S(e, n, r), f = a.success;
        return u.length > 1 && (a.url = u[0], i = u[1]), a.success = function (e) {
            s.html(i ? t("<div>").html(e.replace(o, "")).find(i) : e), f && f.apply(s, arguments)
        }, t.ajax(a), this
    };
    var j = encodeURIComponent;
    t.param = function (e, n) {
        var r = [];
        return r.add = function (e, n) {
            t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(j(e) + "=" + j(n))
        }, C(r, e, n), r.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (e) {
    e.fn.serializeArray = function () {
        var n, r, i = [], s = function (e) {
            return e.forEach ? e.forEach(s) : void i.push({name: n, value: e})
        };
        return this[0] && e.each(this[0].elements, function (i, o) {
            r = o.type, n = o.name, n && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != r && "reset" != r && "button" != r && "file" != r && ("radio" != r && "checkbox" != r || o.checked) && s(e(o).val())
        }), i
    }, e.fn.serialize = function () {
        var e = [];
        return this.serializeArray().forEach(function (n) {
            e.push(encodeURIComponent(n.name) + "=" + encodeURIComponent(n.value))
        }), e.join("&")
    }, e.fn.submit = function (n) {
        if (0 in arguments)this.bind("submit", n); else if (this.length) {
            var r = e.Event("submit");
            this.eq(0).trigger(r), r.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (e) {
    "__proto__"in{} || e.extend(e.zepto, {
        Z: function (t, n) {
            return t = t || [], e.extend(t, e.fn), t.selector = n || "", t.__Z = !0, t
        }, isZ: function (t) {
            return "array" === e.type(t) && "__Z"in t
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (t) {
        var n = getComputedStyle;
        window.getComputedStyle = function (e) {
            try {
                return n(e)
            } catch (t) {
                return null
            }
        }
    }
}(Zepto), function (e) {
    function t(e, t) {
        var n = this.os = {}, r = this.browser = {}, i = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/), s = e.match(/(Android);?[\s\/]+([\d.]+)?/), o = !!e.match(/\(Macintosh\; Intel /), u = e.match(/(iPad).*OS\s([\d_]+)/), a = e.match(/(iPod)(.*OS\s([\d_]+))?/), f = !u && e.match(/(iPhone\sOS)\s([\d_]+)/), l = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), c = /Win\d{2}|Windows/.test(t), h = e.match(/Windows Phone ([\d.]+)/), p = l && e.match(/TouchPad/), d = e.match(/Kindle\/([\d.]+)/), v = e.match(/Silk\/([\d._]+)/), m = e.match(/(BlackBerry).*Version\/([\d.]+)/), g = e.match(/(BB10).*Version\/([\d.]+)/), y = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/), b = e.match(/PlayBook/), w = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/), E = e.match(/Firefox\/([\d.]+)/), S = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/), x = !w && e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/), T = x || e.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
        (r.webkit = !!i) && (r.version = i[1]), s && (n.android = !0, n.version = s[2]), f && !a && (n.ios = n.iphone = !0, n.version = f[2].replace(/_/g, ".")), u && (n.ios = n.ipad = !0, n.version = u[2].replace(/_/g, ".")), a && (n.ios = n.ipod = !0, n.version = a[3] ? a[3].replace(/_/g, ".") : null), h && (n.wp = !0, n.version = h[1]), l && (n.webos = !0, n.version = l[2]), p && (n.touchpad = !0), m && (n.blackberry = !0, n.version = m[2]), g && (n.bb10 = !0, n.version = g[2]), y && (n.rimtabletos = !0, n.version = y[2]), b && (r.playbook = !0), d && (n.kindle = !0, n.version = d[1]), v && (r.silk = !0, r.version = v[1]), !v && n.android && e.match(/Kindle Fire/) && (r.silk = !0), w && (r.chrome = !0, r.version = w[1]), E && (r.firefox = !0, r.version = E[1]), S && (r.ie = !0, r.version = S[1]), T && (o || n.ios || c) && (r.safari = !0, n.ios || (r.version = T[1])), x && (r.webview = !0), n.tablet = !!(u || b || s && !e.match(/Mobile/) || E && e.match(/Tablet/) || S && !e.match(/Phone/) && e.match(/Touch/)), n.phone = !(n.tablet || n.ipod || !(s || f || l || m || g || w && e.match(/Android/) || w && e.match(/CriOS\/([\d.]+)/) || E && e.match(/Mobile/) || S && e.match(/Touch/)))
    }

    t.call(e, navigator.userAgent, navigator.platform), e.__detect = t
}(Zepto), function (e, t) {
    function n(e) {
        return e.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }

    function r(e) {
        return i ? i + e : e.toLowerCase()
    }

    var i, s, o, u, a, f, l, c, h, p, d = "", v = {
        Webkit: "webkit",
        Moz: "",
        O: "o"
    }, m = window.document, g = m.createElement("div"), y = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, b = {};
    e.each(v, function (e, n) {
        return g.style[e + "TransitionProperty"] !== t ? (d = "-" + e.toLowerCase() + "-", i = n, !1) : void 0
    }), s = d + "transform", b[o = d + "transition-property"] = b[u = d + "transition-duration"] = b[f = d + "transition-delay"] = b[a = d + "transition-timing-function"] = b[l = d + "animation-name"] = b[c = d + "animation-duration"] = b[p = d + "animation-delay"] = b[h = d + "animation-timing-function"] = "", e.fx = {
        off: i === t && g.style.transitionProperty === t,
        speeds: {_default: 400, fast: 200, slow: 600},
        cssPrefix: d,
        transitionEnd: r("TransitionEnd"),
        animationEnd: r("AnimationEnd")
    }, e.fn.animate = function (n, r, i, s, o) {
        return e.isFunction(r) && (s = r, i = t, r = t), e.isFunction(i) && (s = i, i = t), e.isPlainObject(r) && (i = r.easing, s = r.complete, o = r.delay, r = r.duration), r && (r = ("number" == typeof r ? r : e.fx.speeds[r] || e.fx.speeds._default) / 1e3), o && (o = parseFloat(o) / 1e3), this.anim(n, r, i, s, o)
    }, e.fn.anim = function (r, i, d, v, m) {
        var g, E, S, x = {}, T = "", N = this, C = e.fx.transitionEnd, k = !1;
        if (i === t && (i = e.fx.speeds._default / 1e3), m === t && (m = 0), e.fx.off && (i = 0), "string" == typeof r)x[l] = r, x[c] = i + "s", x[p] = m + "s", x[h] = d || "linear", C = e.fx.animationEnd; else {
            E = [];
            for (g in r)y.test(g) ? T += g + "(" + r[g] + ") " : (x[g] = r[g], E.push(n(g)));
            T && (x[s] = T, E.push(s)), i > 0 && "object" == typeof r && (x[o] = E.join(", "), x[u] = i + "s", x[f] = m + "s", x[a] = d || "linear")
        }
        return S = function (t) {
            if ("undefined" != typeof t) {
                if (t.target !== t.currentTarget)return;
                e(t.target).unbind(C, S)
            } else e(this).unbind(C, S);
            k = !0, e(this).css(b), v && v.call(this)
        }, i > 0 && (this.bind(C, S), setTimeout(function () {
            k || S.call(N)
        }, 1e3 * (i + m) + 25)), this.size() && this.get(0).clientLeft, this.css(x), 0 >= i && setTimeout(function () {
            N.each(function () {
                S.call(this)
            })
        }, 0), this
    }, g = null
}(Zepto), function (e, t) {
    function n(n, r, i, s, o) {
        "function" != typeof r || o || (o = r, r = t);
        var u = {opacity: i};
        return s && (u.scale = s, n.css(e.fx.cssPrefix + "transform-origin", "0 0")), n.animate(u, r, null, o)
    }

    function r(t, r, i, s) {
        return n(t, r, 0, i, function () {
            o.call(e(this)), s && s.call(this)
        })
    }

    var i = window.document, s = (i.documentElement, e.fn.show), o = e.fn.hide, u = e.fn.toggle;
    e.fn.show = function (e, r) {
        return s.call(this), e === t ? e = 0 : this.css("opacity", 0), n(this, e, 1, "1,1", r)
    }, e.fn.hide = function (e, n) {
        return e === t ? o.call(this) : r(this, e, "0,0", n)
    }, e.fn.toggle = function (n, r) {
        return n === t || "boolean" == typeof n ? u.call(this, n) : this.each(function () {
            var t = e(this);
            t["none" == t.css("display") ? "show" : "hide"](n, r)
        })
    }, e.fn.fadeTo = function (e, t, r) {
        return n(this, e, t, null, r)
    }, e.fn.fadeIn = function (e, t) {
        var n = this.css("opacity");
        return n > 0 ? this.css("opacity", 0) : n = 1, s.call(this).fadeTo(e, n, t)
    }, e.fn.fadeOut = function (e, t) {
        return r(this, e, null, t)
    }, e.fn.fadeToggle = function (t, n) {
        return this.each(function () {
            var r = e(this);
            r[0 == r.css("opacity") || "none" == r.css("display") ? "fadeIn" : "fadeOut"](t, n)
        })
    }
}(Zepto), function (e) {
    var t, n = [];
    e.fn.remove = function () {
        return this.each(function () {
            this.parentNode && ("IMG" === this.tagName && (n.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", t && clearTimeout(t), t = setTimeout(function () {
                n = []
            }, 6e4)), this.parentNode.removeChild(this))
        })
    }
}(Zepto), function (e) {
    function t(t, r) {
        var a = t[u], f = a && i[a];
        if (void 0 === r)return f || n(t);
        if (f) {
            if (r in f)return f[r];
            var l = o(r);
            if (l in f)return f[l]
        }
        return s.call(e(t), r)
    }

    function n(t, n, s) {
        var a = t[u] || (t[u] = ++e.uuid), f = i[a] || (i[a] = r(t));
        return void 0 !== n && (f[o(n)] = s), f
    }

    function r(t) {
        var n = {};
        return e.each(t.attributes || a, function (t, r) {
            0 == r.name.indexOf("data-") && (n[o(r.name.replace("data-", ""))] = e.zepto.deserializeValue(r.value))
        }), n
    }

    var i = {}, s = e.fn.data, o = e.camelCase, u = e.expando = "Zepto" + +(new Date), a = [];
    e.fn.data = function (r, i) {
        return void 0 === i ? e.isPlainObject(r) ? this.each(function (t, i) {
            e.each(r, function (e, t) {
                n(i, e, t)
            })
        }) : 0 in this ? t(this[0], r) : void 0 : this.each(function () {
            n(this, r, i)
        })
    }, e.fn.removeData = function (t) {
        return "string" == typeof t && (t = t.split(/\s+/)), this.each(function () {
            var n = this[u], r = n && i[n];
            r && e.each(t || r, function (e) {
                delete r[t ? o(this) : e]
            })
        })
    }, ["remove", "empty"].forEach(function (t) {
        var n = e.fn[t];
        e.fn[t] = function () {
            var e = this.find("*");
            return "remove" === t && (e = e.add(this)), e.removeData(), n.call(this)
        }
    })
}(Zepto), function (e) {
    function t(n) {
        var r = [["resolve", "done", e.Callbacks({
            once: 1,
            memory: 1
        }), "resolved"], ["reject", "fail", e.Callbacks({
            once: 1,
            memory: 1
        }), "rejected"], ["notify", "progress", e.Callbacks({memory: 1})]], i = "pending", s = {
            state: function () {
                return i
            }, always: function () {
                return o.done(arguments).fail(arguments), this
            }, then: function () {
                var n = arguments;
                return t(function (t) {
                    e.each(r, function (r, i) {
                        var u = e.isFunction(n[r]) && n[r];
                        o[i[1]](function () {
                            var n = u && u.apply(this, arguments);
                            if (n && e.isFunction(n.promise))n.promise().done(t.resolve).fail(t.reject).progress(t.notify); else {
                                var r = this === s ? t.promise() : this, o = u ? [n] : arguments;
                                t[i[0] + "With"](r, o)
                            }
                        })
                    }), n = null
                }).promise()
            }, promise: function (t) {
                return null != t ? e.extend(t, s) : s
            }
        }, o = {};
        return e.each(r, function (e, t) {
            var n = t[2], u = t[3];
            s[t[1]] = n.add, u && n.add(function () {
                i = u
            }, r[1 ^ e][2].disable, r[2][2].lock), o[t[0]] = function () {
                return o[t[0] + "With"](this === o ? s : this, arguments), this
            }, o[t[0] + "With"] = n.fireWith
        }), s.promise(o), n && n.call(o, o), o
    }

    var n = Array.prototype.slice;
    e.when = function (r) {
        var i, s, o, u = n.call(arguments), a = u.length, f = 0, l = 1 !== a || r && e.isFunction(r.promise) ? a : 0, c = 1 === l ? r : t(), h = function (e, t, r) {
            return function (s) {
                t[e] = this, r[e] = arguments.length > 1 ? n.call(arguments) : s, r === i ? c.notifyWith(t, r) : --l || c.resolveWith(t, r)
            }
        };
        if (a > 1)for (i = new Array(a), s = new Array(a), o = new Array(a); a > f; ++f)u[f] && e.isFunction(u[f].promise) ? u[f].promise().done(h(f, o, u)).fail(c.reject).progress(h(f, s, i)) : --l;
        return l || c.resolveWith(o, u), c.promise()
    }, e.Deferred = t
}(Zepto), function (e) {
    e.Callbacks = function (n) {
        n = e.extend({}, n);
        var r, i, s, o, u, a, f = [], l = !n.once && [], c = function (e) {
            for (r = n.memory && e, i = !0, a = o || 0, o = 0, u = f.length, s = !0; f && u > a; ++a)if (f[a].apply(e[0], e[1]) === !1 && n.stopOnFalse) {
                r = !1;
                break
            }
            s = !1, f && (l ? l.length && c(l.shift()) : r ? f.length = 0 : h.disable())
        }, h = {
            add: function () {
                if (f) {
                    var i = f.length, a = function (r) {
                        e.each(r, function (e, t) {
                            "function" == typeof t ? n.unique && h.has(t) || f.push(t) : t && t.length && "string" != typeof t && a(t)
                        })
                    };
                    a(arguments), s ? u = f.length : r && (o = i, c(r))
                }
                return this
            }, remove: function () {
                return f && e.each(arguments, function (n, r) {
                    for (var i; (i = e.inArray(r, f, i)) > -1;)f.splice(i, 1), s && (u >= i && --u, a >= i && --a)
                }), this
            }, has: function (n) {
                return !!f && !!(n ? e.inArray(n, f) > -1 : f.length)
            }, empty: function () {
                return u = f.length = 0, this
            }, disable: function () {
                return f = l = r = void 0, this
            }, disabled: function () {
                return !f
            }, lock: function () {
                return l = void 0, r || h.disable(), this
            }, locked: function () {
                return !l
            }, fireWith: function (e, t) {
                return !f || i && !l || (t = t || [], t = [e, t.slice ? t.slice() : t], s ? l.push(t) : c(t)), this
            }, fire: function () {
                return h.fireWith(this, arguments)
            }, fired: function () {
                return !!i
            }
        };
        return h
    }
}(Zepto), function (e) {
    function t(t) {
        return t = e(t), (!!t.width() || !!t.height()) && "none" !== t.css("display")
    }

    function n(e, t) {
        e = e.replace(/=#\]/g, '="#"]');
        var n, r, i = u.exec(e);
        if (i && i[2]in o && (n = o[i[2]], r = i[3], e = i[1], r)) {
            var s = Number(r);
            r = isNaN(s) ? r.replace(/^["']|["']$/g, "") : s
        }
        return t(e, n, r)
    }

    var r = e.zepto, i = r.qsa, s = r.matches, o = e.expr[":"] = {
        visible: function () {
            return t(this) ? this : void 0
        }, hidden: function () {
            return t(this) ? void 0 : this
        }, selected: function () {
            return this.selected ? this : void 0
        }, checked: function () {
            return this.checked ? this : void 0
        }, parent: function () {
            return this.parentNode
        }, first: function (e) {
            return 0 === e ? this : void 0
        }, last: function (e, t) {
            return e === t.length - 1 ? this : void 0
        }, eq: function (e, t, n) {
            return e === n ? this : void 0
        }, contains: function (t, n, r) {
            return e(this).text().indexOf(r) > -1 ? this : void 0
        }, has: function (e, t, n) {
            return r.qsa(this, n).length ? this : void 0
        }
    }, u = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"), a = /^\s*>/, f = "Zepto" + +(new Date);
    r.qsa = function (t, s) {
        return n(s, function (n, o, u) {
            try {
                var l;
                !n && o ? n = "*" : a.test(n) && (l = e(t).addClass(f), n = "." + f + " " + n);
                var c = i(t, n)
            } catch (h) {
                throw console.error("error performing selector: %o", s), h
            } finally {
                l && l.removeClass(f)
            }
            return o ? r.uniq(e.map(c, function (e, t) {
                return o.call(e, t, c, u)
            })) : c
        })
    }, r.matches = function (e, t) {
        return n(t, function (t, n, r) {
            return (!t || s(e, t)) && (!n || n.call(e, null, r) === e)
        })
    }
}(Zepto), function (e) {
    function t(e, t, n, r) {
        return Math.abs(e - t) >= Math.abs(n - r) ? e - t > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
    }

    function n() {
        l = null, h.last && (h.el.trigger("longTap"), h = {})
    }

    function r() {
        l && clearTimeout(l), l = null
    }

    function i() {
        u && clearTimeout(u), a && clearTimeout(a), f && clearTimeout(f), l && clearTimeout(l), u = a = f = l = null, h = {}
    }

    function s(e) {
        return ("touch" == e.pointerType || e.pointerType == e.MSPOINTER_TYPE_TOUCH) && e.isPrimary
    }

    function o(e, t) {
        return e.type == "pointer" + t || e.type.toLowerCase() == "mspointer" + t
    }

    var u, a, f, l, c, h = {}, p = 750;
    e(document).ready(function () {
        var d, v, m, g, y = 0, b = 0;
        "MSGesture"in window && (c = new MSGesture, c.target = document.body), e(document).bind("MSGestureEnd", function (e) {
            var t = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
            t && (h.el.trigger("swipe"), h.el.trigger("swipe" + t))
        }).on("touchstart MSPointerDown pointerdown", function (t) {
            (!(g = o(t, "down")) || s(t)) && (m = g ? t : t.touches[0], t.touches && 1 === t.touches.length && h.x2 && (h.x2 = void 0, h.y2 = void 0), d = Date.now(), v = d - (h.last || d), h.el = e("tagName"in m.target ? m.target : m.target.parentNode), u && clearTimeout(u), h.x1 = m.pageX, h.y1 = m.pageY, v > 0 && 250 >= v && (h.isDoubleTap = !0), h.last = d, l = setTimeout(n, p), c && g && c.addPointer(t.pointerId))
        }).on("touchmove MSPointerMove pointermove", function (e) {
            (!(g = o(e, "move")) || s(e)) && (m = g ? e : e.touches[0], r(), h.x2 = m.pageX, h.y2 = m.pageY, y += Math.abs(h.x1 - h.x2), b += Math.abs(h.y1 - h.y2))
        }).on("touchend MSPointerUp pointerup", function (n) {
            (!(g = o(n, "up")) || s(n)) && (r(), h.x2 && Math.abs(h.x1 - h.x2) > 30 || h.y2 && Math.abs(h.y1 - h.y2) > 30 ? f = setTimeout(function () {
                h.el && h.el.trigger("swipe"), h.el && h.el.trigger("swipe" + t(h.x1, h.x2, h.y1, h.y2)), h = {}
            }, 0) : "last"in h && (30 > y && 30 > b ? a = setTimeout(function () {
                var t = e.Event("tap");
                t.cancelTouch = i, h.el.trigger(t), h.isDoubleTap ? (h.el && h.el.trigger("doubleTap"), h = {}) : u = setTimeout(function () {
                    u = null, h.el && h.el.trigger("singleTap"), h = {}
                }, 250)
            }, 0) : h = {}), y = b = 0)
        }).on("touchcancel MSPointerCancel pointercancel", i), e(window).on("scroll", i)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (t) {
        e.fn[t] = function (e) {
            return this.on(t, e)
        }
    })
}(Zepto), function (e) {
    function t(e) {
        return "tagName"in e ? e : e.parentNode
    }

    if (e.os.ios) {
        var n, r = {};
        e(document).bind("gesturestart", function (e) {
            var s = Date.now();
            s - (r.last || s), r.target = t(e.target), n && clearTimeout(n), r.e1 = e.scale, r.last = s
        }).bind("gesturechange", function (e) {
            r.e2 = e.scale
        }).bind("gestureend", function (t) {
            r.e2 > 0 ? (0 != Math.abs(r.e1 - r.e2) && e(r.target).trigger("pinch") && e(r.target).trigger("pinch" + (r.e1 - r.e2 > 0 ? "In" : "Out")), r.e1 = r.e2 = r.last = 0) : "last"in r && (r = {})
        }), ["pinch", "pinchIn", "pinchOut"].forEach(function (t) {
            e.fn[t] = function (e) {
                return this.bind(t, e)
            }
        })
    }
}(Zepto), function (e) {
    e.fn.end = function () {
        return this.prevObject || e()
    }, e.fn.andSelf = function () {
        return this.add(this.prevObject || e())
    }, "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function (n) {
        var r = e.fn[n];
        e.fn[n] = function () {
            var e = r.apply(this, arguments);
            return e.prevObject = this, e
        }
    })
}(Zepto), function (e) {
    String.prototype.trim === e && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }), Array.prototype.reduce === e && (Array.prototype.reduce = function (n) {
        if (void 0 === this || null === this)throw new TypeError;
        var r, i = Object(this), s = i.length >>> 0, o = 0;
        if ("function" != typeof n)throw new TypeError;
        if (0 == s && 1 == arguments.length)throw new TypeError;
        if (arguments.length >= 2)r = arguments[1]; else for (; ;) {
            if (o in i) {
                r = i[o++];
                break
            }
            if (++o >= s)throw new TypeError
        }
        for (; s > o;)o in i && (r = n.call(e, r, i[o], o, i)), o++;
        return r
    })
}(), define("zepto", function (e) {
    return function () {
        var t, n;
        return t || e.$
    }
}(this)), define("can", ["zepto"], function (zepto) {
    var __m3 = function () {
        var e = window.can || {};
        if (typeof GLOBALCAN == "undefined" || GLOBALCAN !== !1)window.can = e;
        e.k = function () {
        }, e.isDeferred = function (e) {
            return e && typeof e.then == "function" && typeof e.pipe == "function"
        };
        var t = 0;
        return e.cid = function (e, n) {
            return e._cid || (t++, e._cid = (n || "") + t), e._cid
        }, e.VERSION = "2.1.3", e.simpleExtend = function (e, t) {
            for (var n in t)e[n] = t[n];
            return e
        }, e.frag = function (t) {
            var n;
            return !t || typeof t == "string" ? (n = e.buildFragment(t == null ? "" : "" + t, document.body), n.childNodes.length || n.appendChild(document.createTextNode("")), n) : t.nodeType === 11 ? t : typeof t.nodeType == "number" ? (n = document.createDocumentFragment(), n.appendChild(t), n) : typeof t.length == "number" ? (n = document.createDocumentFragment(), e.each(t, function (t) {
                n.appendChild(e.frag(t))
            }), n) : (n = e.buildFragment("" + t, document.body), n.childNodes.length || n.appendChild(document.createTextNode("")), n)
        }, e.__reading = function () {
        }, e
    }(), __m4 = function (e) {
        var t = window.setImmediate || function (e) {
                return setTimeout(e, 0)
            }, n = {
            MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
            map: {
                "class": "className",
                value: "value",
                innerText: "innerText",
                textContent: "textContent",
                checked: !0,
                disabled: !0,
                readonly: !0,
                required: !0,
                src: function (e, t) {
                    return t == null || t === "" ? (e.removeAttribute("src"), null) : (e.setAttribute("src", t), t)
                },
                style: function (e, t) {
                    return e.style.cssText = t || ""
                }
            },
            defaultValue: ["input", "textarea"],
            set: function (t, r, i) {
                var s;
                n.MutationObserver || (s = n.get(t, r));
                var o = t.nodeName.toString().toLowerCase(), u = n.map[r], a;
                typeof u == "function" ? a = u(t, i) : u === !0 ? (a = t[r] = !0, r === "checked" && t.type === "radio" && e.inArray(o, n.defaultValue) >= 0 && (t.defaultChecked = !0)) : u ? (a = t[u] = i, u === "value" && e.inArray(o, n.defaultValue) >= 0 && (t.defaultValue = i)) : (t.setAttribute(r, i), a = i), !n.MutationObserver && a !== s && n.trigger(t, r, s)
            },
            trigger: function (n, r, i) {
                if (e.data(e.$(n), "canHasAttributesBindings"))return t(function () {
                    e.trigger(n, {type: "attributes", attributeName: r, target: n, oldValue: i, bubbles: !1}, [])
                })
            },
            get: function (e, t) {
                var r = n.map[t];
                return typeof r == "string" && e[r] ? e[r] : e.getAttribute(t)
            },
            remove: function (e, t) {
                var r;
                n.MutationObserver || (r = n.get(e, t));
                var i = n.map[t];
                typeof i == "function" && i(e, undefined), i === !0 ? e[t] = !1 : typeof i == "string" ? e[i] = "" : e.removeAttribute(t), !n.MutationObserver && r != null && n.trigger(e, t, r)
            },
            has: function () {
                var e = document.createElement("div");
                return e.hasAttribute ? function (e, t) {
                    return e.hasAttribute(t)
                } : function (e, t) {
                    return e.getAttribute(t) !== null
                }
            }()
        };
        return n
    }(__m3), __m5 = function (e) {
        return e.addEvent = function (e, t) {
            var n = this.__bindEvents || (this.__bindEvents = {}), r = n[e] || (n[e] = []);
            return r.push({handler: t, name: e}), this
        }, e.listenTo = function (t, n, r) {
            var i = this.__listenToEvents;
            i || (i = this.__listenToEvents = {});
            var s = e.cid(t), o = i[s];
            o || (o = i[s] = {obj: t, events: {}});
            var u = o.events[n];
            u || (u = o.events[n] = []), u.push(r), e.bind.call(t, n, r)
        }, e.stopListening = function (t, n, r) {
            var i = this.__listenToEvents, s = i, o = 0;
            if (!i)return this;
            if (t) {
                var u = e.cid(t);
                (s = {})[u] = i[u];
                if (!i[u])return this
            }
            for (var a in s) {
                var f = s[a], l;
                t = i[a].obj, n ? (l = {})[n] = f.events[n] : l = f.events;
                for (var c in l) {
                    var h = l[c] || [];
                    o = 0;
                    while (o < h.length)r && r === h[o] || !r ? (e.unbind.call(t, c, h[o]), h.splice(o, 1)) : o++;
                    h.length || delete f.events[c]
                }
                e.isEmptyObject(f.events) && delete i[a]
            }
            return this
        }, e.removeEvent = function (e, t, n) {
            if (!this.__bindEvents)return this;
            var r = this.__bindEvents[e] || [], i = 0, s, o = typeof t == "function";
            while (i < r.length)s = r[i], (n ? n(s, e, t) : o && s.handler === t || !o && (s.cid === t || !t)) ? r.splice(i, 1) : i++;
            return this
        }, e.dispatch = function (e, t) {
            var n = this.__bindEvents;
            if (!n)return;
            typeof e == "string" && (e = {type: e});
            var r = e.type, i = (n[r] || []).slice(0), s = [e];
            t && s.push.apply(s, t);
            for (var o = 0, u = i.length; o < u; o++)i[o].handler.apply(this, s);
            return e
        }, e.one = function (t, n) {
            var r = function () {
                return e.unbind.call(this, t, r), n.apply(this, arguments)
            };
            return e.bind.call(this, t, r), this
        }, e.event = {
            on: function () {
                return arguments.length === 0 && e.Control && this instanceof e.Control ? e.Control.prototype.on.call(this) : e.addEvent.apply(this, arguments)
            },
            off: function () {
                return arguments.length === 0 && e.Control && this instanceof e.Control ? e.Control.prototype.off.call(this) : e.removeEvent.apply(this, arguments)
            },
            bind: e.addEvent,
            unbind: e.removeEvent,
            delegate: function (t, n, r) {
                return e.addEvent.call(this, n, r)
            },
            undelegate: function (t, n, r) {
                return e.removeEvent.call(this, n, r)
            },
            trigger: e.dispatch,
            one: e.one,
            addEvent: e.addEvent,
            removeEvent: e.removeEvent,
            listenTo: e.listenTo,
            stopListening: e.stopListening,
            dispatch: e.dispatch
        }, e.event
    }(__m3), __m7 = function (e) {
        var t = Object.prototype.hasOwnProperty, n = function (e) {
            return e !== null && e == e.window
        }, r = function (e) {
            if (!e || typeof e != "object" || e.nodeType || n(e))return !1;
            try {
                if (e.constructor && !t.call(e, "constructor") && !t.call(e.constructor.prototype, "isPrototypeOf"))return !1
            } catch (r) {
                return !1
            }
            var i;
            for (i in e);
            return i === undefined || t.call(e, i)
        };
        return e.isPlainObject = r, e
    }(__m3), __m8 = function (e) {
        var t = /^\s*<(\w+)[^>]*>/, n = {}.toString, r = function (e, r) {
            r === undefined && (r = t.test(e) && RegExp.$1), e && n.call(e.replace) === "[object Function]" && (e = e.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, "<$1></$2>"));
            var i = document.createElement("div"), s = document.createElement("div");
            r === "tbody" || r === "tfoot" || r === "thead" ? (s.innerHTML = "<table>" + e + "</table>", i = s.firstChild.nodeType === 3 ? s.lastChild : s.firstChild) : r === "tr" ? (s.innerHTML = "<table><tbody>" + e + "</tbody></table>", i = s.firstChild.nodeType === 3 ? s.lastChild : s.firstChild.firstChild) : r === "td" || r === "th" ? (s.innerHTML = "<table><tbody><tr>" + e + "</tr></tbody></table>", i = s.firstChild.nodeType === 3 ? s.lastChild : s.firstChild.firstChild.firstChild) : r === "option" ? (s.innerHTML = "<select>" + e + "</select>", i = s.firstChild.nodeType === 3 ? s.lastChild : s.firstChild) : i.innerHTML = "" + e;
            var o = {}, u = i.childNodes;
            o.length = u.length;
            for (var a = 0; a < u.length; a++)o[a] = u[a];
            return [].slice.call(o)
        };
        return e.buildFragment = function (e, t) {
            if (e && e.nodeType === 11)return e;
            var n = r(e), i = document.createDocumentFragment();
            for (var s = 0, o = n.length; s < o; s++)i.appendChild(n[s]);
            return i
        }, function () {
            var t = "<-\n>", n = e.buildFragment(t, document);
            if (t !== n.childNodes[0].nodeValue) {
                var r = e.buildFragment;
                e.buildFragment = function (e, t) {
                    var n = r(e, t);
                    return n.childNodes.length === 1 && n.childNodes[0].nodeType === 3 && (n.childNodes[0].nodeValue = e), n
                }
            }
        }(), e
    }(__m3), __m9 = function (e) {
        var t = function (e, t) {
            for (var n in t)t.hasOwnProperty(n) && (e[n] = t[n])
        }, n = function (e) {
            if (!(this instanceof n))return new n;
            this._doneFuncs = [], this._failFuncs = [], this._resultArgs = null, this._status = "", e && e.call(this, this)
        };
        e.Deferred = n, e.when = n.when = function () {
            var t = e.makeArray(arguments);
            if (t.length < 2) {
                var r = t[0];
                return r && e.isFunction(r.isResolved) && e.isFunction(r.isRejected) ? r : n().resolve(r)
            }
            var i = n(), s = 0, o = [];
            return e.each(t, function (e, n) {
                e.done(function () {
                    o[n] = arguments.length < 2 ? arguments[0] : arguments, ++s === t.length && i.resolve.apply(i, o)
                }).fail(function () {
                    i.reject(arguments.length === 1 ? arguments[0] : arguments)
                })
            }), i
        };
        var r = function (e, t) {
            return function (n) {
                var r = this._resultArgs = arguments.length > 1 ? arguments[1] : [];
                return this.exec(n, this[e], r, t)
            }
        }, i = function u(t, n) {
            return function () {
                var r = this;
                return e.each(Array.prototype.slice.call(arguments), function (e, i, s) {
                    if (!e)return;
                    e.constructor === Array ? u.apply(r, e) : (r._status === n && e.apply(r, r._resultArgs || []), r[t].push(e))
                }), this
            }
        }, s = function (e) {
            return e && e.then && e.fail && e.done
        }, o = function (t, n, r, i) {
            s(n) ? n.done(e.proxy(t.resolve, t)).fail(e.proxy(t.reject, t)) : r.call(t, n !== undefined ? n : i)
        };
        return t(n.prototype, {
            then: function (t, n) {
                var r = e.Deferred(), i = r.resolve, s = r.reject;
                return this.done(function (e) {
                    typeof t == "function" ? o(r, t.apply(this, arguments), i, e) : i.apply(r, arguments)
                }), this.fail(function (e) {
                    typeof n == "function" ? o(r, n.apply(this, arguments), s, e) : s.apply(r, arguments)
                }), r
            },
            resolveWith: r("_doneFuncs", "rs"),
            rejectWith: r("_failFuncs", "rj"),
            done: i("_doneFuncs", "rs"),
            fail: i("_failFuncs", "rj"),
            always: function () {
                var t = e.makeArray(arguments);
                return t.length && t[0] && this.done(t[0]).fail(t[0]), this
            },
            state: function () {
                switch (this._status) {
                    case"rs":
                        return "resolved";
                    case"rj":
                        return "rejected";
                    default:
                        return "pending"
                }
            },
            isResolved: function () {
                return this._status === "rs"
            },
            isRejected: function () {
                return this._status === "rj"
            },
            reject: function () {
                return this.rejectWith(this, arguments)
            },
            resolve: function () {
                return this.resolveWith(this, arguments)
            },
            exec: function (t, n, r, i) {
                return this._status !== "" ? this : (this._status = i, e.each(n, function (e) {
                    typeof e.apply == "function" && e.apply(t, r)
                }), this)
            },
            promise: function () {
                var e = this.then();
                return e.reject = e.resolve = undefined, e
            }
        }), n.prototype.pipe = n.prototype.then, e
    }(__m3), __m10 = function (e) {
        var t = function (e) {
            var t = e.length;
            return typeof arr != "function" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in e)
        };
        return e.each = function (n, r, i) {
            var s = 0, o, u, a;
            if (n)if (t(n))if (e.List && n instanceof e.List)for (u = n.attr("length"); s < u; s++) {
                a = n.attr(s);
                if (r.call(i || a, a, s, n) === !1)break
            } else for (u = n.length; s < u; s++) {
                a = n[s];
                if (r.call(i || a, a, s, n) === !1)break
            } else if (typeof n == "object")if (e.Map && n instanceof e.Map || n === e.route) {
                var f = e.Map.keys(n);
                for (s = 0, u = f.length; s < u; s++) {
                    o = f[s], a = n.attr(o);
                    if (r.call(i || a, a, o, n) === !1)break
                }
            } else for (o in n)if (n.hasOwnProperty(o) && r.call(i || n[o], n[o], o, n) === !1)break;
            return n
        }, e
    }(__m3), __m11 = function (e) {
        e.inserted = function (t) {
            t = e.makeArray(t);
            var n = !1, r = e.$(document.contains ? document : document.body), i;
            for (var s = 0, o; (o = t[s]) !== undefined; s++) {
                if (!n) {
                    if (!o.getElementsByTagName)continue;
                    if (!e.has(r, o).length)return;
                    n = !0
                }
                if (n && o.getElementsByTagName) {
                    i = e.makeArray(o.getElementsByTagName("*")), e.trigger(o, "inserted", [], !1);
                    for (var u = 0, a; (a = i[u]) !== undefined; u++)e.trigger(a, "inserted", [], !1)
                }
            }
        }, e.appendChild = function (t, n) {
            var r;
            n.nodeType === 11 ? r = e.makeArray(n.childNodes) : r = [n], t.appendChild(n), e.inserted(r)
        }, e.insertBefore = function (t, n, r) {
            var i;
            n.nodeType === 11 ? i = e.makeArray(n.childNodes) : i = [n], t.insertBefore(n, r), e.inserted(i)
        }
    }(__m3), __m2 = function (e, t, n) {
        function a(e, t) {
            var n = e[u], o = n && i[n];
            return t === undefined ? o || f(e) : o && o[t] || s.call(r(e), t)
        }

        function f(e, t, n) {
            var r = e[u] || (e[u] = ++o), s = i[r] || (i[r] = {});
            return t !== undefined && (s[t] = n), s
        }

        var r = Zepto, i = {}, s = r.fn.data, o = r.uuid = +(new Date), u = r.expando = "Zepto" + o;
        r.fn.data = function (e, t) {
            return t === undefined ? this.length === 0 ? undefined : a(this[0], e) : this.each(function (n) {
                f(this, e, r.isFunction(t) ? t.call(this, n, a(this, e)) : t)
            })
        }, r.cleanData = function (t) {
            for (var n = 0, r; (r = t[n]) !== undefined; n++)e.trigger(r, "removed", [], !1);
            for (n = 0; (r = t[n]) !== undefined; n++) {
                var s = r[u];
                delete i[s]
            }
        };
        var l = e.each;
        r.extend(e, Zepto), e.each = l, e.attr = t, e.event = n;
        var c = function (e, t) {
            return e[0] && e[0][t] || e[t]
        };
        e.trigger = function (t, n, i, s) {
            t.trigger ? t.trigger(n, i) : c(t, "dispatchEvent") ? s === !1 ? r([t]).triggerHandler(n, i) : r([t]).trigger(n, i) : (typeof n == "string" && (n = {type: n}), n.target = n.target || t, e.dispatch.call(t, n, e.makeArray(i)))
        }, e.$ = Zepto, e.bind = function (t, n) {
            return this.bind && this.bind !== e.bind ? this.bind(t, n) : c(this, "addEventListener") ? r([this]).bind(t, n) : e.addEvent.call(this, t, n), this
        }, e.unbind = function (t, n) {
            return this.unbind && this.unbind !== e.unbind ? this.unbind(t, n) : c(this, "addEventListener") ? r([this]).unbind(t, n) : e.removeEvent.call(this, t, n), this
        }, e.on = e.bind, e.off = e.unbind, e.delegate = function (t, n, i) {
            t ? this.delegate ? this.delegate(t, n, i) : c(this, "addEventListener") ? r([this]).delegate(t, n, i) : e.addEvent.call(this, n, i) : e.bind.call(this, n, i)
        }, e.undelegate = function (t, n, i) {
            t ? this.undelegate ? this.undelegate(t, n, i) : c(this, "addEventListener") ? r([this]).undelegate(t, n, i) : e.removeEvent.call(this, n, i) : e.unbind.call(this, n, i)
        }, r.each(["append", "filter", "addClass", "remove", "data", "has"], function (t, n) {
            e[n] = function (t) {
                return t[n].apply(t, e.makeArray(arguments).slice(1))
            }
        }), e.makeArray = function (t) {
            var n = [];
            return t == null ? [] : t.length === undefined || typeof t == "string" ? [t] : (e.each(t, function (e, t) {
                n[t] = e
            }), n)
        }, e.proxy = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        };
        var h = r.ajaxSettings.xhr;
        r.ajaxSettings.xhr = function () {
            var e = h(), t = e.open;
            return e.open = function (e, n, r) {
                t.call(this, e, n, p === undefined ? !0 : p)
            }, e
        };
        var p, d = r.ajax, v = function (e, t) {
            for (var n in e)typeof t[n] == "function" ? t[n] = function () {
                e[n].apply(e, arguments)
            } : t[n] = n[e]
        };
        e.ajax = function (t) {
            var n = t.success, r = t.error, i = e.Deferred();
            t.success = function (e) {
                v(s, i), i.resolve.call(i, e), n && n.apply(this, arguments)
            }, t.error = function () {
                v(s, i), i.reject.apply(i, arguments), r && r.apply(this, arguments)
            }, t.async === !1 && (p = !1);
            var s = d(t);
            return p = undefined, v(s, i), i
        };
        var m = r.fn.empty;
        r.fn.empty = function () {
            return this.each(function () {
                r.cleanData(this.getElementsByTagName("*")), this.innerHTML = ""
            }), m.call(this)
        };
        var g = r.fn.remove;
        r.fn.remove = function () {
            return this.each(function () {
                this.getElementsByTagName && r.cleanData([this].concat(e.makeArray(this.getElementsByTagName("*"))))
            }), g.call(this)
        }, e.trim = function (e) {
            return e.trim()
        }, e.isEmptyObject = function (e) {
            var t;
            for (t in e);
            return t === undefined
        }, e.extend = function (t) {
            if (t === !0) {
                var n = e.makeArray(arguments);
                return n.shift(), r.extend.apply(r, n)
            }
            return r.extend.apply(r, arguments)
        }, e.get = function (e, t) {
            return e[t]
        }, e.each(["after", "prepend", "before", "append", "html"], function (t) {
            var n = Zepto.fn[t];
            Zepto.fn[t] = function () {
                var t, i = e.makeArray(arguments);
                i[0] != null && (typeof i[0] == "string" && (i[0] = r.zepto.fragment(i[0])), i[0].nodeType === 11 ? t = e.makeArray(i[0].childNodes) : t = [i[0]]);
                var s = n.apply(this, i);
                return e.inserted(t), s
            }
        }), delete t.MutationObserver;
        var y = r.fn.attr;
        r.fn.attr = function (t, n) {
            var r = typeof t == "string", i, s;
            n !== undefined && r && (i = y.call(this, t));
            var o = y.apply(this, arguments);
            return n !== undefined && r && (s = y.call(this, t)), s !== i && e.attr.trigger(this[0], t, i), o
        };
        var b = r.fn.removeAttr;
        r.fn.removeAttr = function (t) {
            var n = y.call(this, t), r = b.apply(this, arguments);
            return n != null && e.attr.trigger(this[0], t, n), r
        };
        var w = r.fn.bind, E = r.fn.unbind;
        return r.fn.bind = function (t) {
            return t === "attributes" && this.each(function () {
                var t = e.$(this);
                e.data(t, "canHasAttributesBindings", (e.data(t, "canHasAttributesBindings") || 0) + 1)
            }), w.apply(this, arguments)
        }, r.fn.unbind = function (t) {
            return t === "attributes" && this.each(function () {
                var t = e.$(this), n = e.data(t, "canHasAttributesBindings") || 0;
                n <= 0 ? e.data(t, "canHasAttributesBindings", 0) : e.data(t, "canHasAttributesBindings", n - 1)
            }), E.apply(this, arguments)
        }, e
    }(__m3, __m4, __m5, Zepto, __m7, __m8, __m9, __m10, __m11), __m13 = function (e) {
        var t = e.isFunction, n = e.makeArray, r = 1, i = function (e) {
            var t = function () {
                return f.frag(e.apply(this, arguments))
            };
            return t.render = function () {
                return e.apply(e, arguments)
            }, t
        }, s = function (e, t) {
            if (!e.length)throw"can.view: No template or empty template:" + t
        }, o = function (t, n) {
            var r = typeof t == "string" ? t : t.url, i = t.engine && "." + t.engine || r.match(/\.[\w\d]+$/), o, u, a;
            r.match(/^#/) && (r = r.substr(1));
            if (u = document.getElementById(r))i = "." + u.type.match(/\/(x\-)?(.+)/)[2];
            !i && !f.cached[r] && (r += i = f.ext), e.isArray(i) && (i = i[0]), a = f.toId(r), r.match(/^\/\//) && (r = r.substr(2), r = window.steal ? steal.config().root.mapJoin("" + steal.id(r)) : r), window.require && require.toUrl && (r = require.toUrl(r)), o = f.types[i];
            if (f.cached[a])return f.cached[a];
            if (u)return f.registerView(a, u.innerHTML, o);
            var l = new e.Deferred;
            return e.ajax({
                cache: !1, async: n, url: r, dataType: "text", error: function (e) {
                    s("", r), l.reject(e)
                }, success: function (e) {
                    s(e, r), f.registerView(a, e, o, l)
                }
            }), l
        }, u = function (t) {
            var n = [];
            if (e.isDeferred(t))return [t];
            for (var r in t)e.isDeferred(t[r]) && n.push(t[r]);
            return n
        }, a = function (t) {
            return e.isArray(t) && t[1] === "success" ? t[0] : t
        }, f = e.view = e.template = function (e, n, r, i) {
            t(r) && (i = r, r = undefined);
            var s;
            return t(e) ? s = e(n, r, i) : s = f.renderAs("fragment", e, n, r, i), s
        };
        return e.extend(f, {
            frag: function (e, t) {
                return f.hookup(f.fragment(e), t)
            }, fragment: function (t) {
                if (typeof t != "string" && t.nodeType === 11)return t;
                var n = e.buildFragment(t, document.body);
                return n.childNodes.length || n.appendChild(document.createTextNode("")), n
            }, toId: function (t) {
                return e.map(t.toString().split(/\/|\./g), function (e) {
                    if (e)return e
                }).join("_")
            }, toStr: function (e) {
                return e == null ? "" : "" + e
            }, hookup: function (t, n) {
                var r = [], i, s;
                return e.each(t.childNodes ? e.makeArray(t.childNodes) : t, function (t) {
                    t.nodeType === 1 && (r.push(t), r.push.apply(r, e.makeArray(t.getElementsByTagName("*"))))
                }), e.each(r, function (e) {
                    e.getAttribute && (i = e.getAttribute("data-view-id")) && (s = f.hookups[i]) && (s(e, n, i), delete f.hookups[i], e.removeAttribute("data-view-id"))
                }), t
            }, hookups: {}, hook: function (e) {
                return f.hookups[++r] = e, " data-view-id='" + r + "'"
            }, cached: {}, cachedRenderers: {}, cache: !0, register: function (t) {
                this.types["." + t.suffix] = t, e[t.suffix] = f[t.suffix] = function (e, n) {
                    var r, s;
                    if (!n)return s = function () {
                        return r || (t.fragRenderer ? r = t.fragRenderer(null, e) : r = i(t.renderer(null, e))), r.apply(this, arguments)
                    }, s.render = function () {
                        var n = t.renderer(null, e);
                        return n.apply(n, arguments)
                    }, s;
                    var o = function () {
                        return r || (t.fragRenderer ? r = t.fragRenderer(e, n) : r = t.renderer(e, n)), r.apply(this, arguments)
                    };
                    return t.fragRenderer ? f.preload(e, o) : f.preloadStringRenderer(e, o)
                }
            }, types: {}, ext: ".ejs", registerScript: function (e, t, n) {
                return "can.view.preloadStringRenderer('" + t + "'," + f.types["." + e].script(t, n) + ");"
            }, preload: function (t, n) {
                var r = f.cached[t] = (new e.Deferred).resolve(function (e, t) {
                    return n.call(e, e, t)
                });
                return r.__view_id = t, f.cachedRenderers[t] = n, n
            }, preloadStringRenderer: function (e, t) {
                return this.preload(e, i(t))
            }, render: function (t, n, r, i) {
                return e.view.renderAs("string", t, n, r, i)
            }, renderTo: function (e, t, n, r) {
                return (e === "string" && t.render ? t.render : t)(n, r)
            }, renderAs: function (r, i, s, l, c) {
                t(l) && (c = l, l = undefined);
                var h = u(s), p, d, v, m, g;
                if (h.length)return d = new e.Deferred, v = e.extend({}, s), h.push(o(i, !0)), e.when.apply(e, h).then(function (t) {
                    var i = n(arguments), o = i.pop(), u;
                    if (e.isDeferred(s))v = a(t); else for (var f in s)e.isDeferred(s[f]) && (v[f] = a(i.shift()));
                    u = e.view.renderTo(r, o, v, l), d.resolve(u, v), c && c(u, v)
                }, function () {
                    d.reject.apply(d, arguments)
                }), d;
                p = e.__clearReading(), m = t(c), d = o(i, m), p && e.__setReading(p);
                if (m)g = d, d.then(function (t) {
                    c(s ? e.view.renderTo(r, t, s, l) : t)
                }); else {
                    if (d.state() === "resolved" && d.__view_id) {
                        var y = f.cachedRenderers[d.__view_id];
                        return s ? e.view.renderTo(r, y, s, l) : y
                    }
                    d.then(function (t) {
                        g = s ? e.view.renderTo(r, t, s, l) : t
                    })
                }
                return g
            }, registerView: function (t, n, r, s) {
                var o = typeof r == "object" ? r : f.types[r || f.ext], u;
                return o.fragRenderer ? u = o.fragRenderer(t, n) : u = i(o.renderer(t, n)), s = s || new e.Deferred, f.cache && (f.cached[t] = s, s.__view_id = t, f.cachedRenderers[t] = u), s.resolve(u)
            }
        }), e
    }(__m2), __m12 = function (e) {
        var t = e.view.attr = function (e, t) {
            if (!t) {
                var i = n[e];
                if (!i)for (var s = 0, o = r.length; s < o; s++) {
                    var u = r[s];
                    if (u.match.test(e)) {
                        i = u.handler;
                        break
                    }
                }
                return i
            }
            typeof e == "string" ? n[e] = t : r.push({match: e, handler: t})
        }, n = {}, r = [], i = /[-\:]/, s = e.view.tag = function (e, t) {
            if (!t) {
                var n = o[e.toLowerCase()];
                return !n && i.test(e) && (n = function () {
                }), n
            }
            window.html5 && (window.html5.elements += " " + e, window.html5.shivDocument()), o[e.toLowerCase()] = t
        }, o = {};
        return e.view.callbacks = {
            _tags: o,
            _attributes: n,
            _regExpAttributes: r,
            tag: s,
            attr: t,
            tagHandler: function (t, n, r) {
                var i = r.options.attr("tags." + n), s = i || o[n], u = r.scope, a;
                if (s) {
                    var f = e.__clearReading();
                    a = s(t, r), e.__setReading(f)
                } else a = u;
                if (a && r.subtemplate) {
                    u !== a && (u = u.add(a));
                    var l = r.subtemplate(u, r.options), c = typeof l == "string" ? e.view.frag(l) : l;
                    e.appendChild(t, c)
                }
            }
        }, e.view.callbacks
    }(__m2, __m13), __m16 = function (e) {
        var t = /_|-/, n = /\=\=/, r = /([A-Z]+)([A-Z][a-z])/g, i = /([a-z\d])([A-Z])/g, s = /([a-z\d])([A-Z])/g, o = /\{([^\}]+)\}/g, u = /"/g, a = /'/g, f = /-+(.)?/g, l = /[a-z][A-Z]/g, c = function (e, t, n) {
            var r = e[t];
            return r === undefined && n === !0 && (r = e[t] = {}), r
        }, h = function (e) {
            return /^f|^o/.test(typeof e)
        }, p = function (e) {
            var t = e === null || e === undefined || isNaN(e) && "" + e == "NaN";
            return "" + (t ? "" : e)
        };
        return e.extend(e, {
            esc: function (e) {
                return p(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(u, "&#34;").replace(a, "&#39;")
            }, getObject: function (t, n, r) {
                var i = t ? t.split(".") : [], s = i.length, o, u = 0, a, f, l;
                n = e.isArray(n) ? n : [n || window], l = n.length;
                if (!s)return n[0];
                for (u; u < l; u++) {
                    o = n[u], f = undefined;
                    for (a = 0; a < s && h(o); a++)f = o, o = c(f, i[a]);
                    if (f !== undefined && o !== undefined)break
                }
                r === !1 && o !== undefined && delete f[i[a - 1]];
                if (r === !0 && o === undefined) {
                    o = n[0];
                    for (a = 0; a < s && h(o); a++)o = c(o, i[a], !0)
                }
                return o
            }, capitalize: function (e, t) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }, camelize: function (e) {
                return p(e).replace(f, function (e, t) {
                    return t ? t.toUpperCase() : ""
                })
            }, hyphenate: function (e) {
                return p(e).replace(l, function (e, t) {
                    return e.charAt(0) + "-" + e.charAt(1).toLowerCase()
                })
            }, underscore: function (e) {
                return e.replace(n, "/").replace(r, "$1_$2").replace(i, "$1_$2").replace(s, "_").toLowerCase()
            }, sub: function (t, n, r) {
                var i = [];
                return t = t || "", i.push(t.replace(o, function (t, s) {
                    var o = e.getObject(s, n, r === !0 ? !1 : undefined);
                    return o === undefined || o === null ? (i = null, "") : h(o) && i ? (i.push(o), "") : "" + o
                })), i === null ? i : i.length <= 1 ? i[0] : i
            }, replacer: o, undHash: t
        }), e
    }(__m2), __m15 = function (e) {
        var t = 0;
        return e.Construct = function () {
            if (arguments.length)return e.Construct.extend.apply(e.Construct, arguments)
        }, e.extend(e.Construct, {
            constructorExtends: !0, newInstance: function () {
                var e = this.instance(), t;
                return e.setup && (t = e.setup.apply(e, arguments)), e.init && e.init.apply(e, t || arguments), e
            }, _inherit: function (t, n, r) {
                e.extend(r || t, t || {})
            }, _overwrite: function (e, t, n, r) {
                e[n] = r
            }, setup: function (t, n) {
                this.defaults = e.extend(!0, {}, t.defaults, this.defaults)
            }, instance: function () {
                t = 1;
                var e = new this;
                return t = 0, e
            }, extend: function (n, r, i) {
                function y() {
                    if (!t)return this.constructor !== y && arguments.length && y.constructorExtends ? y.extend.apply(y, arguments) : y.newInstance.apply(y, arguments)
                }

                var s = n, o = r, u = i;
                typeof s != "string" && (u = o, o = s, s = null), u || (u = o, o = null), u = u || {};
                var a = this, f = this.prototype, l, c, h, p, d, v, m, g;
                g = this.instance(), e.Construct._inherit(u, f, g);
                for (d in a)a.hasOwnProperty(d) && (y[d] = a[d]);
                e.Construct._inherit(o, a, y), s && (l = s.split("."), v = l.pop(), c = e.getObject(l.join("."), window, !0), m = c, h = e.underscore(s.replace(/\./g, "_")), p = e.underscore(v), c[v] = y), e.extend(y, {
                    constructor: y,
                    prototype: g,
                    namespace: m,
                    _shortName: p,
                    fullName: s,
                    _fullName: h
                }), v !== undefined && (y.shortName = v), y.prototype.constructor = y;
                var b = [a].concat(e.makeArray(arguments)), w = y.setup.apply(y, b);
                return y.init && y.init.apply(y, w || b), y
            }
        }), e.Construct.prototype.setup = function () {
        }, e.Construct.prototype.init = function () {
        }, e.Construct
    }(__m16), __m14 = function (e) {
        var t = function (t, n, r) {
            return e.bind.call(t, n, r), function () {
                e.unbind.call(t, n, r)
            }
        }, n = e.isFunction, r = e.extend, i = e.each, s = [].slice, o = /\{([^\}]+)\}/g, u = e.getObject("$.event.special", [e]) || {}, a = function (t, n, r, i) {
            return e.delegate.call(t, n, r, i), function () {
                e.undelegate.call(t, n, r, i)
            }
        }, f = function (n, r, i, s) {
            return s ? a(n, e.trim(s), r, i) : t(n, r, i)
        }, l, c = e.Control = e.Construct({
            setup: function () {
                e.Construct.setup.apply(this, arguments);
                if (e.Control) {
                    var t = this, n;
                    t.actions = {};
                    for (n in t.prototype)t._isAction(n) && (t.actions[n] = t._action(n))
                }
            }, _shifter: function (t, r) {
                var i = typeof r == "string" ? t[r] : r;
                return n(i) || (i = t[i]), function () {
                    return t.called = r, i.apply(t, [this.nodeName ? e.$(this) : this].concat(s.call(arguments, 0)))
                }
            }, _isAction: function (e) {
                var t = this.prototype[e], r = typeof t;
                return e !== "constructor" && (r === "function" || r === "string" && n(this.prototype[t])) && !!(u[e] || h[e] || /[^\w]/.test(e))
            }, _action: function (t, n) {
                o.lastIndex = 0;
                if (n || !o.test(t)) {
                    var r = n ? e.sub(t, this._lookup(n)) : t;
                    if (!r)return null;
                    var i = e.isArray(r), s = i ? r[1] : r, u = s.split(/\s+/g), a = u.pop();
                    return {processor: h[a] || l, parts: [s, u.join(" "), a], delegate: i ? r[0] : undefined}
                }
            }, _lookup: function (e) {
                return [e, window]
            }, processors: {}, defaults: {}
        }, {
            setup: function (t, n) {
                var i = this.constructor, s = i.pluginName || i._fullName, o;
                return this.element = e.$(t), s && s !== "can_control" && this.element.addClass(s), o = e.data(this.element, "controls"), o || (o = [], e.data(this.element, "controls", o)), o.push(this), this.options = r({}, i.defaults, n), this.on(), [this.element, this.options]
            }, on: function (t, n, r, i) {
                if (!t) {
                    this.off();
                    var s = this.constructor, o = this._bindings, u = s.actions, a = this.element, l = e.Control._shifter(this, "destroy"), c, h;
                    for (c in u)u.hasOwnProperty(c) && (h = u[c] || s._action(c, this.options, this), h && (o.control[c] = h.processor(h.delegate || a, h.parts[2], h.parts[1], c, this)));
                    return e.bind.call(a, "removed", l), o.user.push(function (t) {
                        e.unbind.call(t, "removed", l)
                    }), o.user.length
                }
                return typeof t == "string" && (i = r, r = n, n = t, t = this.element), i === undefined && (i = r, r = n, n = null), typeof i == "string" && (i = e.Control._shifter(this, i)), this._bindings.user.push(f(t, r, i, n)), this._bindings.user.length
            }, off: function () {
                var e = this.element[0], t = this._bindings;
                t && (i(t.user || [], function (t) {
                    t(e)
                }), i(t.control || {}, function (t) {
                    t(e)
                })), this._bindings = {user: [], control: {}}
            }, destroy: function () {
                if (this.element === null)return;
                var t = this.constructor, n = t.pluginName || t._fullName, r;
                this.off(), n && n !== "can_control" && this.element.removeClass(n), r = e.data(this.element, "controls"), r.splice(e.inArray(this, r), 1), e.trigger(this, "destroyed"), this.element = null
            }
        }), h = e.Control.processors;
        return l = function (t, n, r, i, s) {
            return f(t, n, e.Control._shifter(s, i), r)
        }, i(["change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchcancel", "touchend", "touchleave", "inserted", "removed"], function (e) {
            h[e] = l
        }), c
    }(__m2, __m15), __m19 = function (e) {
        return e.bindAndSetup = function () {
            return e.addEvent.apply(this, arguments), this._init || (this._bindings ? this._bindings++ : (this._bindings = 1, this._bindsetup && this._bindsetup())), this
        }, e.unbindAndTeardown = function (t, n) {
            return e.removeEvent.apply(this, arguments), this._bindings === null ? this._bindings = 0 : this._bindings--, !this._bindings && this._bindteardown && this._bindteardown(), this
        }, e
    }(__m2), __m20 = function (e) {
        var t = e.bubble = {
            event: function (e, t) {
                return e.constructor._bubbleRule(t, e)
            }, childrenOf: function (e, n) {
                e._each(function (r, i) {
                    r && r.bind && t.toParent(r, e, i, n)
                })
            }, teardownChildrenFrom: function (e, n) {
                e._each(function (r) {
                    t.teardownFromParent(e, r, n)
                })
            }, toParent: function (t, n, r, i) {
                e.listenTo.call(n, t, i, function () {
                    var i = e.makeArray(arguments), s = i.shift();
                    i[0] = (e.List && n instanceof e.List ? n.indexOf(t) : r) + (i[0] ? "." + i[0] : ""), s.triggeredNS = s.triggeredNS || {};
                    if (s.triggeredNS[n._cid])return;
                    s.triggeredNS[n._cid] = !0, e.trigger(n, s, i)
                })
            }, teardownFromParent: function (t, n, r) {
                n && n.unbind && e.stopListening.call(t, n, r)
            }, isBubbling: function (e, t) {
                return e._bubbleBindings && e._bubbleBindings[t]
            }, bind: function (e, n) {
                if (!e._init) {
                    var r = t.event(e, n);
                    r && (e._bubbleBindings || (e._bubbleBindings = {}), e._bubbleBindings[r] ? e._bubbleBindings[r]++ : (e._bubbleBindings[r] = 1, t.childrenOf(e, r)))
                }
            }, unbind: function (n, r) {
                var i = t.event(n, r);
                i && (n._bubbleBindings && n._bubbleBindings[i]--, n._bubbleBindings && !n._bubbleBindings[i] && (delete n._bubbleBindings[i], t.teardownChildrenFrom(n, i), e.isEmptyObject(n._bubbleBindings) && delete n._bubbleBindings))
            }, add: function (n, r, i) {
                if (r instanceof e.Map && n._bubbleBindings)for (var s in n._bubbleBindings)n._bubbleBindings[s] && (t.teardownFromParent(n, r, s), t.toParent(r, n, i, s))
            }, removeMany: function (e, n) {
                for (var r = 0, i = n.length; r < i; r++)t.remove(e, n[r])
            }, remove: function (n, r) {
                if (r instanceof e.Map && n._bubbleBindings)for (var i in n._bubbleBindings)n._bubbleBindings[i] && t.teardownFromParent(n, r, i)
            }, set: function (n, r, i, s) {
                return e.Map.helpers.isObservable(i) && t.add(n, i, r), e.Map.helpers.isObservable(s) && t.remove(n, s), i
            }
        };
        return t
    }(__m2), __m21 = function (e) {
        var t = 1, n = 0, r = [], i = [];
        e.batch = {
            start: function (e) {
                n++, e && i.push(e)
            }, stop: function (s, o) {
                s ? n = 0 : n--;
                if (n === 0) {
                    var u = r.slice(0), a = i.slice(0), f, l;
                    r = [], i = [], t++, o && e.batch.start();
                    for (f = 0, l = u.length; f < l; f++)e.dispatch.apply(u[f][0], u[f][1]);
                    for (f = 0, l = a.length; f < a.length; f++)a[f]()
                }
            }, trigger: function (i, s, o) {
                if (!i._init) {
                    if (n === 0)return e.dispatch.call(i, s, o);
                    s = typeof s == "string" ? {type: s} : s, s.batchNum = t, r.push([i, [s, o]])
                }
            }
        }
    }(__m3), __m18 = function (e, t, n) {
        var r = null, i = function () {
            for (var e in r)r[e].added && delete r[e].obj._cid;
            r = null
        }, s = function (e) {
            return r && r[e._cid] && r[e._cid].instance
        }, o = null, u = e.Map = e.Construct.extend({
            setup: function () {
                e.Construct.setup.apply(this, arguments);
                if (e.Map) {
                    this.defaults || (this.defaults = {}), this._computes = [];
                    for (var t in this.prototype)t !== "define" && typeof this.prototype[t] != "function" ? this.defaults[t] = this.prototype[t] : this.prototype[t].isComputed && this._computes.push(t);
                    this.helpers.define && this.helpers.define(this)
                }
                e.List && !(this.prototype instanceof e.List) && (this.List = u.List.extend({Map: this}, {}))
            },
            _bubble: n,
            _bubbleRule: function (e) {
                return (e === "change" || e.indexOf(".") >= 0) && "change"
            },
            _computes: [],
            bind: e.bindAndSetup,
            on: e.bindAndSetup,
            unbind: e.unbindAndTeardown,
            off: e.unbindAndTeardown,
            id: "id",
            helpers: {
                define: null, attrParts: function (e, t) {
                    return t ? [e] : typeof e == "object" ? e : ("" + e).split(".")
                }, addToMap: function (t, n) {
                    var s;
                    r || (s = i, r = {});
                    var o = t._cid, u = e.cid(t);
                    return r[u] || (r[u] = {obj: t, instance: n, added: !o}), s
                }, isObservable: function (t) {
                    return t instanceof e.Map || t && t === e.route
                }, canMakeObserve: function (t) {
                    return t && !e.isDeferred(t) && (e.isArray(t) || e.isPlainObject(t))
                }, serialize: function (t, n, r) {
                    var i = e.cid(t), s = !1;
                    return o || (s = !0, o = {attr: {}, serialize: {}}), o[n][i] = r, t.each(function (i, s) {
                        var a, f = u.helpers.isObservable(i), l = f && o[n][e.cid(i)];
                        l ? a = l : n === "serialize" ? a = u.helpers._serialize(t, s, i) : a = u.helpers._getValue(t, s, i, n), a !== undefined && (r[s] = a)
                    }), e.__reading(t, "__keys"), s && (o = null), r
                }, _serialize: function (e, t, n) {
                    return u.helpers._getValue(e, t, n, "serialize")
                }, _getValue: function (e, t, n, r) {
                    return u.helpers.isObservable(n) ? n[r]() : n
                }
            },
            keys: function (t) {
                var n = [];
                e.__reading(t, "__keys");
                for (var r in t._data)n.push(r);
                return n
            }
        }, {
            setup: function (t) {
                t instanceof e.Map && (t = t.serialize()), this._data = {}, e.cid(this, ".map"), this._init = 1;
                var n = this._setupDefaults();
                this._setupComputes(n);
                var r = t && e.Map.helpers.addToMap(t, this), i = e.extend(e.extend(!0, {}, n), t);
                this.attr(i), r && r(), this.bind("change", e.proxy(this._changes, this)), delete this._init
            }, _setupComputes: function () {
                var e = this.constructor._computes;
                this._computedBindings = {};
                for (var t = 0, n = e.length, r; t < n; t++)r = e[t], this[r] = this[r].clone(this), this._computedBindings[r] = {count: 0}
            }, _setupDefaults: function () {
                return this.constructor.defaults || {}
            }, _bindsetup: function () {
            }, _bindteardown: function () {
            }, _changes: function (t, n, r, i, s) {
                e.batch.trigger(this, {type: n, batchNum: t.batchNum, target: t.target}, [i, s])
            }, _triggerChange: function (t, r, i, s) {
                n.isBubbling(this, "change") ? e.batch.trigger(this, {
                    type: "change",
                    target: this
                }, [t, r, i, s]) : e.batch.trigger(this, t, [i, s]), (r === "remove" || r === "add") && e.batch.trigger(this, {
                    type: "__keys",
                    target: this
                })
            }, _each: function (e) {
                var t = this.__get();
                for (var n in t)t.hasOwnProperty(n) && e(t[n], n)
            }, attr: function (t, n) {
                var r = typeof t;
                return r !== "string" && r !== "number" ? this._attrs(t, n) : arguments.length === 1 ? (e.__reading(this, t), this._get(t)) : (this._set(t, n), this)
            }, each: function () {
                return e.each.apply(undefined, [this].concat(e.makeArray(arguments)))
            }, removeAttr: function (t) {
                var n = e.List && this instanceof e.List, r = e.Map.helpers.attrParts(t), i = r.shift(), s = n ? this[i] : this._data[i];
                return r.length && s ? s.removeAttr(r) : (typeof t == "string" && !!~t.indexOf(".") && (i = t), this._remove(i, s), s)
            }, _remove: function (e, t) {
                e in this._data && (delete this._data[e], e in this.constructor.prototype || delete this[e], this._triggerChange(e, "remove", undefined, t))
            }, _get: function (e) {
                e = "" + e;
                var t = e.indexOf(".");
                if (t >= 0) {
                    var n = this.__get(e);
                    if (n !== undefined)return n;
                    var r = e.substr(0, t), i = e.substr(t + 1), s = this.__get(r);
                    return s && s._get ? s._get(i) : undefined
                }
                return this.__get(e)
            }, __get: function (e) {
                return e ? this._computedBindings[e] ? this[e]() : this._data[e] : this._data
            }, __type: function (t, n) {
                if (!(t instanceof e.Map) && e.Map.helpers.canMakeObserve(t)) {
                    var r = s(t);
                    if (r)return r;
                    if (e.isArray(t)) {
                        var i = e.List;
                        return new i(t)
                    }
                    var o = this.constructor.Map || e.Map;
                    return new o(t)
                }
                return t
            }, _set: function (e, t, n) {
                e = "" + e;
                var r = e.indexOf("."), i;
                if (!n && r >= 0) {
                    var s = e.substr(0, r), o = e.substr(r + 1);
                    i = this._init ? undefined : this.__get(s);
                    if (!u.helpers.isObservable(i))throw"can.Map: Object does not exist";
                    i._set(o, t)
                } else this.__convert && (t = this.__convert(e, t)), i = this._init ? undefined : this.__get(e), this.__set(e, this.__type(t, e), i)
            }, __set: function (e, t, n) {
                if (t !== n) {
                    var r = n !== undefined || this.__get().hasOwnProperty(e) ? "set" : "add";
                    this.___set(e, this.constructor._bubble.set(this, e, t, n)), this._triggerChange(e, r, t, n), n && this.constructor._bubble.teardownFromParent(this, n)
                }
            }, ___set: function (e, t) {
                this._computedBindings[e] ? this[e](t) : this._data[e] = t, typeof this.constructor.prototype[e] != "function" && !this._computedBindings[e] && (this[e] = t)
            }, bind: function (t, n) {
                var r = this._computedBindings && this._computedBindings[t];
                if (r)if (!r.count) {
                    r.count = 1;
                    var i = this;
                    r.handler = function (n, r, s) {
                        e.batch.trigger(i, {type: t, batchNum: n.batchNum, target: i}, [r, s])
                    }, this[t].bind("change", r.handler)
                } else r.count++;
                return this.constructor._bubble.bind(this, t), e.bindAndSetup.apply(this, arguments)
            }, unbind: function (t, n) {
                var r = this._computedBindings && this._computedBindings[t];
                return r && (r.count === 1 ? (r.count = 0, this[t].unbind("change", r.handler), delete r.handler) : r.count--), this.constructor._bubble.unbind(this, t), e.unbindAndTeardown.apply(this, arguments)
            }, serialize: function () {
                return e.Map.helpers.serialize(this, "serialize", {})
            }, _attrs: function (t, n) {
                if (t === undefined)return u.helpers.serialize(this, "attr", {});
                t = e.simpleExtend({}, t);
                var r, i = this, s;
                e.batch.start(), this.each(function (e, r) {
                    if (r === "_cid")return;
                    s = t[r];
                    if (s === undefined) {
                        n && i.removeAttr(r);
                        return
                    }
                    i.__convert && (s = i.__convert(r, s)), u.helpers.isObservable(s) ? i.__set(r, i.__type(s, r), e) : u.helpers.isObservable(e) && u.helpers.canMakeObserve(s) ? e.attr(s, n) : e !== s && i.__set(r, i.__type(s, r), e), delete t[r]
                });
                for (r in t)r !== "_cid" && (s = t[r], this._set(r, s, !0));
                return e.batch.stop(), this
            }, compute: function (t) {
                if (e.isFunction(this.constructor.prototype[t]))return e.compute(this[t], this);
                var n = t.split("."), r = n.length - 1, i = {args: []};
                return e.compute(function (t) {
                    if (!arguments.length)return e.compute.read(this, n, i).value;
                    e.compute.read(this, n.slice(0, r)).value.attr(n[r], t)
                }, this)
            }
        });
        return u.prototype.on = u.prototype.bind, u.prototype.off = u.prototype.unbind, u
    }(__m2, __m19, __m20, __m15, __m21), __m22 = function (e, t, n) {
        var r = [].splice, i = function () {
            var e = {0: "a", length: 1};
            return r.call(e, 0, 1), !e[0]
        }(), s = t.extend({Map: t}, {
            setup: function (t, n) {
                this.length = 0, e.cid(this, ".map"), this._init = 1, this._setupComputes(), t = t || [];
                var r;
                e.isDeferred(t) ? this.replace(t) : (r = t.length && e.Map.helpers.addToMap(t, this), this.push.apply(this, e.makeArray(t || []))), r && r(), this.bind("change", e.proxy(this._changes, this)), e.simpleExtend(this, n), delete this._init
            }, _triggerChange: function (n, r, i, s) {
                t.prototype._triggerChange.apply(this, arguments);
                var o = +n;
                !~n.indexOf(".") && !isNaN(o) && (r === "add" ? (e.batch.trigger(this, r, [i, o]), e.batch.trigger(this, "length", [this.length])) : r === "remove" ? (e.batch.trigger(this, r, [s, o]), e.batch.trigger(this, "length", [this.length])) : e.batch.trigger(this, r, [i, o]))
            }, __get: function (t) {
                return t ? this[t] && this[t].isComputed && e.isFunction(this.constructor.prototype[t]) ? this[t]() : this[t] : this
            }, ___set: function (e, t) {
                this[e] = t, +e >= this.length && (this.length = +e + 1)
            }, _remove: function (e, t) {
                isNaN(+e) ? (delete this[e], this._triggerChange(e, "remove", undefined, t)) : this.splice(e, 1)
            }, _each: function (e) {
                var t = this.__get();
                for (var n = 0; n < t.length; n++)e(t[n], n)
            }, serialize: function () {
                return t.helpers.serialize(this, "serialize", [])
            }, splice: function (t, s) {
                var o = e.makeArray(arguments), u = [], a, f;
                for (a = 2; a < o.length; a++)o[a] = n.set(this, a, this.__type(o[a], a)), u.push(o[a]);
                s === undefined && (s = o[1] = this.length - t);
                var l = r.apply(this, o), c = l;
                if (u.length && l.length)for (f = 0; f < l.length; f++)e.inArray(l[f], u) >= 0 && c.splice(f, 1);
                if (!i)for (a = this.length; a < l.length + this.length; a++)delete this[a];
                return e.batch.start(), s > 0 && (this._triggerChange("" + t, "remove", undefined, l), n.removeMany(this, l)), o.length > 2 && this._triggerChange("" + t, "add", o.slice(2), l), e.batch.stop(), l
            }, _attrs: function (n, r) {
                if (n === undefined)return t.helpers.serialize(this, "attr", []);
                n = e.makeArray(n), e.batch.start(), this._updateAttrs(n, r), e.batch.stop()
            }, _updateAttrs: function (e, n) {
                var r = Math.min(e.length, this.length);
                for (var i = 0; i < r; i++) {
                    var s = this[i], o = e[i];
                    t.helpers.isObservable(s) && t.helpers.canMakeObserve(o) ? s.attr(o, n) : s !== o && this._set(i, o)
                }
                e.length > this.length ? this.push.apply(this, e.slice(this.length)) : e.length < this.length && n && this.splice(e.length)
            }
        }), o = function (t) {
            return t[0] && e.isArray(t[0]) ? t[0] : e.makeArray(t)
        };
        return e.each({push: "length", unshift: 0}, function (e, t) {
            var r = [][t];
            s.prototype[t] = function () {
                var t = [], i = e ? this.length : 0, s = arguments.length, o, u;
                while (s--)u = arguments[s], t[s] = n.set(this, s, this.__type(u, s));
                return o = r.apply(this, t), (!this.comparator || t.length) && this._triggerChange("" + i, "add", t, undefined), o
            }
        }), e.each({pop: "length", shift: 0}, function (e, t) {
            s.prototype[t] = function () {
                var r = o(arguments), i = e && this.length ? this.length - 1 : 0, s = [][t].apply(this, r);
                return this._triggerChange("" + i, "remove", undefined, [s]), s && s.unbind && n.remove(this, s), s
            }
        }), e.extend(s.prototype, {
            indexOf: function (t, n) {
                return this.attr("length"), e.inArray(t, this, n)
            }, join: function () {
                return [].join.apply(this.attr(), arguments)
            }, reverse: function () {
                var t = e.makeArray([].reverse.call(this));
                this.replace(t)
            }, slice: function () {
                var e = Array.prototype.slice.apply(this, arguments);
                return new this.constructor(e)
            }, concat: function () {
                var t = [];
                return e.each(e.makeArray(arguments), function (n, r) {
                    t[r] = n instanceof e.List ? n.serialize() : n
                }), new this.constructor(Array.prototype.concat.apply(this.serialize(), t))
            }, forEach: function (t, n) {
                return e.each(this, t, n || this)
            }, replace: function (t) {
                return e.isDeferred(t) ? t.then(e.proxy(this.replace, this)) : this.splice.apply(this, [0, this.length].concat(e.makeArray(t || []))), this
            }, filter: function (t, n) {
                var r = new e.List, i = this, s;
                return this.each(function (e, o, u) {
                    s = t.call(n | i, e, o, i), s && r.push(e)
                }), r
            }
        }), e.List = t.List = s, e.List
    }(__m2, __m18, __m20), __m23 = function (e, t) {
        var n = [];
        e.__read = function (e, t) {
            n.push({});
            var r = e.call(t);
            return {value: r, observed: n.pop()}
        }, e.__reading = function (e, t) {
            n.length && (n[n.length - 1][e._cid + "|" + t] = {obj: e, event: t + ""})
        }, e.__clearReading = function () {
            if (n.length) {
                var e = n[n.length - 1];
                return n[n.length - 1] = {}, e
            }
        }, e.__setReading = function (e) {
            n.length && (n[n.length - 1] = e)
        }, e.__addReading = function (t) {
            n.length && e.simpleExtend(n[n.length - 1], t)
        };
        var r = function (t, n, r, s) {
            var u = e.__read(t, n), a = u.observed;
            return i(r, a, s), o(r, s), u
        }, i = function (e, t, n) {
            for (var r in t)s(e, t, r, n)
        }, s = function (e, t, n, r) {
            if (e[n])delete e[n]; else {
                var i = t[n];
                i.obj.bind(i.event, r)
            }
        }, o = function (e, t) {
            for (var n in e) {
                var r = e[n];
                r.obj.unbind(r.event, t)
            }
        }, u = function (t, n, r, i) {
            n !== r && e.batch.trigger(t, i ? {type: "change", batchNum: i} : "change", [n, r])
        }, a = function (t, n, i, s) {
            var o, u, a;
            return {
                on: function (f) {
                    u || (u = function (e) {
                        if (t.bound && (e.batchNum === undefined || e.batchNum !== a)) {
                            var s = o.value;
                            o = r(n, i, o.observed, u), f(o.value, s, e.batchNum), a = a = e.batchNum
                        }
                    }), o = r(n, i, {}, u), s(o.value), t.hasDependencies = !e.isEmptyObject(o.observed)
                }, off: function (e) {
                    for (var t in o.observed) {
                        var n = o.observed[t];
                        n.obj.unbind(n.event, u)
                    }
                }
            }
        }, f = function (t, n, i, s) {
            var o, u, a, f;
            return {
                on: function (l) {
                    a || (a = function (r) {
                        if (t.bound && (r.batchNum === undefined || r.batchNum !== f)) {
                            var s = e.__clearReading(), o = n.call(i);
                            e.__setReading(s), l(o, u, r.batchNum), u = o, f = f = r.batchNum
                        }
                    }), o = r(n, i, {}, a), u = o.value, s(o.value), t.hasDependencies = !e.isEmptyObject(o.observed)
                }, off: function (e) {
                    for (var t in o.observed) {
                        var n = o.observed[t];
                        n.obj.unbind(n.event, a)
                    }
                }
            }
        }, l = function (t) {
            return t instanceof e.Map || t && t.__get
        }, c = function () {
        };
        e.compute = function (t, r, i, s) {
            if (t && t.isComputed)return t;
            var o, l = c, h = c, p, d = function () {
                return p
            }, v = function (e) {
                p = e
            }, m = v, g = [], y = function (e, t, n) {
                m(e), u(o, e, t, n)
            }, b;
            for (var w = 0, E = arguments.length; w < E; w++)g[w] = arguments[w];
            o = function (t) {
                if (arguments.length) {
                    var i = p, s = v.call(r, t, i);
                    return o.hasDependencies ? d.call(r) : (s === undefined ? p = d.call(r) : p = s, u(o, p, i), p)
                }
                return n.length && o.canReadForChangeEvent !== !1 && (e.__reading(o, "change"), o.bound || e.compute.temporarilyBind(o)), o.bound ? p : d.call(r)
            };
            if (typeof t == "function") {
                v = t, d = t, o.canReadForChangeEvent = i === !1 ? !1 : !0;
                var S = s ? f(o, t, r || this, m) : a(o, t, r || this, m);
                l = S.on, h = S.off
            } else if (r)if (typeof r == "string") {
                var x = r, T = t instanceof e.Map;
                if (T) {
                    o.hasDependencies = !0;
                    var N;
                    d = function () {
                        return t.attr(x)
                    }, v = function (e) {
                        t.attr(x, e)
                    }, l = function (n) {
                        N = function (e, t, r) {
                            n(t, r, e.batchNum)
                        }, t.bind(i || x, N), p = e.__read(d).value
                    }, h = function (e) {
                        t.unbind(i || x, N)
                    }
                } else d = function () {
                    return t[x]
                }, v = function (e) {
                    t[x] = e
                }, l = function (n) {
                    N = function () {
                        n(d(), p)
                    }, e.bind.call(t, i || x, N), p = e.__read(d).value
                }, h = function (n) {
                    e.unbind.call(t, i || x, N)
                }
            } else if (typeof r == "function")p = t, v = r, r = i, b = "setter"; else {
                p = t;
                var C = r, L = y;
                r = C.context || C, d = C.get || d, v = C.set || function () {
                        return p
                    };
                if (C.fn) {
                    var A = C.fn, O;
                    d = function () {
                        return A.call(r, p)
                    }, A.length === 0 ? O = a(o, A, r, m) : A.length === 1 ? O = a(o, function () {
                        return A.call(r, p)
                    }, r, m) : (y = function (e) {
                        e !== undefined && L(e, p)
                    }, O = a(o, function () {
                        var e = A.call(r, p, function (e) {
                            L(e, p)
                        });
                        return e !== undefined ? e : p
                    }, r, m)), l = O.on, h = O.off
                } else y = function () {
                    var e = d.call(r);
                    L(e, p)
                };
                l = C.on || l, h = C.off || h
            } else p = t;
            return e.cid(o, "compute"), e.simpleExtend(o, {
                isComputed: !0, _bindsetup: function () {
                    this.bound = !0;
                    var t = e.__clearReading();
                    l.call(this, y), e.__setReading(t)
                }, _bindteardown: function () {
                    h.call(this, y), this.bound = !1
                }, bind: e.bindAndSetup, unbind: e.unbindAndTeardown, clone: function (t) {
                    return t && (b === "setter" ? g[2] = t : g[1] = t), e.compute.apply(e, g)
                }
            })
        };
        var h, p = function () {
            for (var e = 0, t = h.length; e < t; e++)h[e].unbind("change", c);
            h = null
        };
        return e.compute.temporarilyBind = function (e) {
            e.bind("change", c), h || (h = [], setTimeout(p, 10)), h.push(e)
        }, e.compute.truthy = function (t) {
            return e.compute(function () {
                var e = t();
                return typeof e == "function" && (e = e()), !!e
            })
        }, e.compute.async = function (t, n, r) {
            return e.compute(t, {fn: n, context: r})
        }, e.compute.read = function (t, n, r) {
            r = r || {};
            var i = t, s, o, u;
            for (var a = 0, f = n.length; a < f; a++) {
                o = i, o && o.isComputed && (r.foundObservable && r.foundObservable(o, a), o = i = o()), l(o) ? (!u && r.foundObservable && r.foundObservable(o, a), u = 1, typeof o[n[a]] == "function" && o.constructor.prototype[n[a]] === o[n[a]] ? r.returnObserveMethods ? i = i[n[a]] : n[a] === "constructor" && o instanceof e.Construct ? i = o[n[a]] : i = o[n[a]].apply(o, r.args || []) : i = i.attr(n[a])) : i = o[n[a]], s = typeof i, i && i.isComputed && !r.isArgument && a < f - 1 ? (!u && r.foundObservable && r.foundObservable(o, a + 1), i = i()) : a < n.length - 1 && s === "function" && r.executeAnonymousFunctions && !(e.Construct && i.prototype instanceof e.Construct) && (i = i());
                if (a < n.length - 1 && (i === null || s !== "function" && s !== "object"))return r.earlyExit && r.earlyExit(o, a, i), {
                    value: undefined,
                    parent: o
                }
            }
            return typeof i == "function" && !(e.Construct && i.prototype instanceof e.Construct) && (!e.route || i !== e.route) && (r.isArgument ? !i.isComputed && r.proxyMethods !== !1 && (i = e.proxy(i, o)) : (i.isComputed && !u && r.foundObservable && r.foundObservable(i, a), i = i.call(o))), i === undefined && r.earlyExit && r.earlyExit(o, a - 1), {
                value: i,
                parent: o
            }
        }, e.compute
    }(__m2, __m19, __m21), __m17 = function (e) {
        return e.Observe = e.Map, e.Observe.startBatch = e.batch.start, e.Observe.stopBatch = e.batch.stop, e.Observe.triggerBatch = e.batch.trigger, e
    }(__m2, __m18, __m22, __m23), __m25 = function (e) {
        var t = /(\\)?\./g, n = /\\\./g, r = function (e) {
            var r = [], i = 0;
            return e.replace(t, function (t, s, o) {
                s || (r.push(e.slice(i, o).replace(n, ".")), i = o + t.length)
            }), r.push(e.slice(i).replace(n, ".")), r
        }, i = e.Construct.extend({read: e.compute.read}, {
            init: function (e, t) {
                this._context = e, this._parent = t, this.__cache = {}
            }, attr: function (t) {
                var n = e.__clearReading(), r = this.read(t, {
                    isArgument: !0,
                    returnObserveMethods: !0,
                    proxyMethods: !1
                }).value;
                return e.__setReading(n), r
            }, add: function (e) {
                return e !== this._context ? new this.constructor(e, this) : this
            }, computeData: function (t, n) {
                n = n || {args: []};
                var r = this, i, s, o = {
                    compute: e.compute(function (u) {
                        if (!arguments.length) {
                            if (i)return e.compute.read(i, s, n).value;
                            var f = r.read(t, n);
                            return i = f.rootObserve, s = f.reads, o.scope = f.scope, o.initialValue = f.value, o.reads = f.reads, o.root = i, f.value
                        }
                        if (i.isComputed && !s.length)i(u); else {
                            var a = s.length - 1;
                            e.compute.read(i, s.slice(0, a)).value.attr(s[a], u)
                        }
                    })
                };
                return o
            }, compute: function (e, t) {
                return this.computeData(e, t).compute
            }, read: function (t, n) {
                var i;
                if (t.substr(0, 2) === "./")i = !0, t = t.substr(2); else {
                    if (t.substr(0, 3) === "../")return this._parent.read(t.substr(3), n);
                    if (t === "..")return {value: this._parent._context};
                    if (t === "." || t === "this")return {value: this._context}
                }
                var s = t.indexOf("\\.") === -1 ? t.split(".") : r(t), o, u = this, a, f = [], l = -1, c, h, p, d;
                while (u) {
                    o = u._context;
                    if (o !== null) {
                        var v = e.compute.read(o, s, e.simpleExtend({
                            foundObservable: function (e, t) {
                                p = e, d = s.slice(t)
                            }, earlyExit: function (t, n) {
                                n > l && (a = p, f = d, l = n, h = u, c = e.__clearReading())
                            }, executeAnonymousFunctions: !0
                        }, n));
                        if (v.value !== undefined)return {scope: u, rootObserve: p, value: v.value, reads: d}
                    }
                    e.__clearReading(), i ? u = null : u = u._parent
                }
                return a ? (e.__setReading(c), {scope: h, rootObserve: a, reads: f, value: undefined}) : {
                    names: s,
                    value: undefined
                }
            }
        });
        return e.view.Scope = i, i
    }(__m2, __m15, __m18, __m22, __m13, __m23), __m27 = function (e) {
        var t = function () {
            return e.$(document.createComment("~")).length === 1
        }(), n = {
            tagToContentPropMap: {
                option: "textContent"in document.createElement("option") ? "textContent" : "innerText",
                textarea: "value"
            },
            attrMap: e.attr.map,
            attrReg: /([^\s=]+)[\s]*=[\s]*/,
            defaultValue: e.attr.defaultValue,
            tagMap: {
                "": "span",
                colgroup: "col",
                table: "tbody",
                tr: "td",
                ol: "li",
                ul: "li",
                tbody: "tr",
                thead: "tr",
                tfoot: "tr",
                select: "option",
                optgroup: "option"
            },
            reverseTagMap: {col: "colgroup", tr: "tbody", option: "select", td: "tr", th: "tr", li: "ul"},
            getParentNode: function (e, t) {
                return t && e.parentNode.nodeType === 11 ? t : e.parentNode
            },
            setAttr: e.attr.set,
            getAttr: e.attr.get,
            removeAttr: e.attr.remove,
            contentText: function (e) {
                return typeof e == "string" ? e : !e && e !== 0 ? "" : "" + e
            },
            after: function (t, n) {
                var r = t[t.length - 1];
                r.nextSibling ? e.insertBefore(r.parentNode, n, r.nextSibling) : e.appendChild(r.parentNode, n)
            },
            replace: function (r, i) {
                n.after(r, i), e.remove(e.$(r)).length < r.length && !t && e.each(r, function (e) {
                    e.nodeType === 8 && e.parentNode.removeChild(e)
                })
            }
        };
        return e.view.elements = n, n
    }(__m2, __m13), __m26 = function (can, elements, viewCallbacks) {
        var newLine = /(\r|\n)+/g, notEndTag = /\//, clean = function (e) {
            return e.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("	").join("\\t")
        }, getTag = function (e, t, n) {
            if (e)return e;
            while (n < t.length) {
                if (t[n] === "<" && !notEndTag.test(t[n + 1]))return elements.reverseTagMap[t[n + 1]] || "span";
                n++
            }
            return ""
        }, bracketNum = function (e) {
            return --e.split("{").length - --e.split("}").length
        }, myEval = function (script) {
            eval(script)
        }, attrReg = /([^\s]+)[\s]*=[\s]*$/, startTxt = "var ___v1ew = [];", finishTxt = "return ___v1ew.join('')", put_cmd = "___v1ew.push(\n", insert_cmd = put_cmd, htmlTag = null, quote = null, beforeQuote = null, rescan = null, getAttrName = function () {
            var e = beforeQuote.match(attrReg);
            return e && e[1]
        }, status = function () {
            return quote ? "'" + getAttrName() + "'" : htmlTag ? 1 : 0
        }, top = function (e) {
            return e[e.length - 1]
        }, Scanner;
        return can.view.Scanner = Scanner = function (e) {
            can.extend(this, {
                text: {},
                tokens: []
            }, e), this.text.options = this.text.options || "", this.tokenReg = [], this.tokenSimple = {
                "<": "<",
                ">": ">",
                '"': '"',
                "'": "'"
            }, this.tokenComplex = [], this.tokenMap = {};
            for (var t = 0, n; n = this.tokens[t]; t++)n[2] ? (this.tokenReg.push(n[2]), this.tokenComplex.push({
                abbr: n[1],
                re: new RegExp(n[2]),
                rescan: n[3]
            })) : (this.tokenReg.push(n[1]), this.tokenSimple[n[1]] = n[0]), this.tokenMap[n[0]] = n[1];
            this.tokenReg = new RegExp("(" + this.tokenReg.slice(0).concat(["<", ">", '"', "'"]).join("|") + ")", "g")
        }, Scanner.prototype = {
            helpers: [], scan: function (e, t) {
                var n = [], r = 0, i = this.tokenSimple, s = this.tokenComplex;
                e = e.replace(newLine, "\n"), this.transform && (e = this.transform(e)), e.replace(this.tokenReg, function (t, o) {
                    var u = arguments[arguments.length - 2];
                    u > r && n.push(e.substring(r, u));
                    if (i[t])n.push(t); else for (var a = 0, f; f = s[a]; a++)if (f.re.test(t)) {
                        n.push(f.abbr), f.rescan && n.push(f.rescan(o));
                        break
                    }
                    r = u + o.length
                }), r < e.length && n.push(e.substr(r));
                var o = "", u = [startTxt + (this.text.start || "")], a = function (e, t) {
                    u.push(put_cmd, '"', clean(e), '"' + (t || "") + ");")
                }, f = [], l, c = null, h = !1, p = {
                    attributeHookups: [],
                    tagHookups: [],
                    lastTagHookup: ""
                }, d = function () {
                    p.lastTagHookup = p.tagHookups.pop() + p.tagHookups.length
                }, v = "", m = [], g = !1, y, b = !1, w = 0, E, S = this.tokenMap, x;
                htmlTag = quote = beforeQuote = null;
                for (; (E = n[w++]) !== undefined;) {
                    if (c === null)switch (E) {
                        case S.left:
                        case S.escapeLeft:
                        case S.returnLeft:
                            h = htmlTag && 1;
                        case S.commentLeft:
                            c = E, o.length && a(o), o = "";
                            break;
                        case S.escapeFull:
                            h = htmlTag && 1, rescan = 1, c = S.escapeLeft, o.length && a(o), rescan = n[w++], o = rescan.content || rescan, rescan.before && a(rescan.before), n.splice(w, 0, S.right);
                            break;
                        case S.commentFull:
                            break;
                        case S.templateLeft:
                            o += S.left;
                            break;
                        case"<":
                            n[w].indexOf("!--") !== 0 && (htmlTag = 1, h = 0), o += E;
                            break;
                        case">":
                            htmlTag = 0;
                            var T = o.substr(o.length - 1) === "/" || o.substr(o.length - 2) === "--", N = "";
                            p.attributeHookups.length && (N = "attrs: ['" + p.attributeHookups.join("','") + "'], ", p.attributeHookups = []);
                            if (v + p.tagHookups.length !== p.lastTagHookup && v === top(p.tagHookups))T && (o = o.substr(0, o.length - 1)), u.push(put_cmd, '"', clean(o), '"', ",can.view.pending({tagName:'" + v + "'," + N + "scope: " + (this.text.scope || "this") + this.text.options), T ? (u.push("}));"), o = "/>", d()) : n[w] === "<" && n[w + 1] === "/" + v ? (u.push("}));"), o = E, d()) : (u.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || "")), o = ""); else if (h || !g && elements.tagToContentPropMap[m[m.length - 1]] || N) {
                                var C = ",can.view.pending({" + N + "scope: " + (this.text.scope || "this") + this.text.options + '}),"';
                                T ? a(o.substr(0, o.length - 1), C + '/>"') : a(o, C + '>"'), o = "", h = 0
                            } else o += E;
                            if (T || g)m.pop(), v = m[m.length - 1], g = !1;
                            p.attributeHookups = [];
                            break;
                        case"'":
                        case'"':
                            if (htmlTag)if (quote && quote === E) {
                                quote = null;
                                var k = getAttrName();
                                viewCallbacks.attr(k) && p.attributeHookups.push(k);
                                if (b) {
                                    o += E, a(o), u.push(finishTxt, "}));\n"), o = "", b = !1;
                                    break
                                }
                            } else if (quote === null) {
                                quote = E, beforeQuote = l, x = getAttrName();
                                if (v === "img" && x === "src" || x === "style") {
                                    a(o.replace(attrReg, "")), o = "", b = !0, u.push(insert_cmd, "can.view.txt(2,'" + getTag(v, n, w) + "'," + status() + ",this,function(){", startTxt), a(x + "=" + E);
                                    break
                                }
                            }
                            ;
                        default:
                            if (l === "<") {
                                v = E.substr(0, 3) === "!--" ? "!--" : E.split(/\s/)[0];
                                var L = !1, A;
                                v.indexOf("/") === 0 && (L = !0, A = v.substr(1)), L ? (top(m) === A && (v = A, g = !0), top(p.tagHookups) === A && (a(o.substr(0, o.length - 1)), u.push(finishTxt + "}}) );"), o = "><", d())) : (v.lastIndexOf("/") === v.length - 1 && (v = v.substr(0, v.length - 1)), v !== "!--" && viewCallbacks.tag(v) && (v === "content" && elements.tagMap[top(m)] && (E = E.replace("content", elements.tagMap[top(m)])), p.tagHookups.push(v)), m.push(v))
                            }
                            o += E
                    } else switch (E) {
                        case S.right:
                        case S.returnRight:
                            switch (c) {
                                case S.left:
                                    y = bracketNum(o), y === 1 ? (u.push(insert_cmd, "can.view.txt(0,'" + getTag(v, n, w) + "'," + status() + ",this,function(){", startTxt, o), f.push({
                                        before: "",
                                        after: finishTxt + "}));\n"
                                    })) : (r = f.length && y === -1 ? f.pop() : {after: ";"}, r.before && u.push(r.before), u.push(o, ";", r.after));
                                    break;
                                case S.escapeLeft:
                                case S.returnLeft:
                                    y = bracketNum(o), y && f.push({before: finishTxt, after: "}));\n"});
                                    var O = c === S.escapeLeft ? 1 : 0, M = {
                                        insert: insert_cmd,
                                        tagName: getTag(v, n, w),
                                        status: status(),
                                        specialAttribute: b
                                    };
                                    for (var _ = 0; _ < this.helpers.length; _++) {
                                        var D = this.helpers[_];
                                        if (D.name.test(o)) {
                                            o = D.fn(o, M), D.name.source === /^>[\s]*\w*/.source && (O = 0);
                                            break
                                        }
                                    }
                                    typeof o == "object" ? o.startTxt && o.end && b ? u.push(insert_cmd, "can.view.toStr( ", o.content, "() ) );") : (o.startTxt ? u.push(insert_cmd, "can.view.txt(\n" + (typeof status() == "string" || (o.escaped != null ? o.escaped : O)) + ",\n'" + v + "',\n" + status() + ",\nthis,\n") : o.startOnlyTxt && u.push(insert_cmd, "can.view.onlytxt(this,\n"), u.push(o.content), o.end && u.push("));")) : b ? u.push(insert_cmd, o, ");") : u.push(insert_cmd, "can.view.txt(\n" + (typeof status() == "string" || O) + ",\n'" + v + "',\n" + status() + ",\nthis,\nfunction(){ " + (this.text.escape || "") + "return ", o, y ? startTxt : "}));\n"), rescan && rescan.after && rescan.after.length && (a(rescan.after.length), rescan = null)
                            }
                            c = null, o = "";
                            break;
                        case S.templateLeft:
                            o += S.left;
                            break;
                        default:
                            o += E
                    }
                    l = E
                }
                o.length && a(o), u.push(";");
                var P = u.join(""), H = {out: (this.text.outStart || "") + P + " " + finishTxt + (this.text.outEnd || "")};
                return myEval.call(H, "this.fn = (function(" + this.text.argNames + "){" + H.out + "});\r\n//# sourceURL=" + t + ".js"), H
            }
        }, can.view.pending = function (e) {
            var t = can.view.getHooks();
            return can.view.hook(function (n) {
                can.each(t, function (e) {
                    e(n)
                }), e.templateType = "legacy", e.tagName && viewCallbacks.tagHandler(n, e.tagName, e), can.each(e && e.attrs || [], function (t) {
                    e.attributeName = t;
                    var r = viewCallbacks.attr(t);
                    r && r(n, e)
                })
            })
        }, can.view.tag("content", function (e, t) {
            return t.scope
        }), can.view.Scanner = Scanner, Scanner
    }(__m13, __m27, __m12), __m30 = function (e) {
        var t = !0;
        try {
            document.createTextNode("")._ = 0
        } catch (n) {
            t = !1
        }
        var r = {}, i = {}, s = "ejs_" + Math.random(), o = 0, u = function (e, n) {
            var r = n || i, u = a(e, r);
            return u ? u : t || e.nodeType !== 3 ? (++o, e[s] = (e.nodeName ? "element_" : "obj_") + o) : (++o, r["text_" + o] = e, "text_" + o)
        }, a = function (e, n) {
            if (t || e.nodeType !== 3)return e[s];
            for (var r in n)if (n[r] === e)return r
        }, f = [].splice, l = [].push, c = function (e) {
            var t = 0;
            for (var n = 0, r = e.length; n < r; n++) {
                var i = e[n];
                i.nodeType ? t++ : t += c(i)
            }
            return t
        }, h = function (e, t) {
            var n = {};
            for (var r = 0, i = e.length; r < i; r++) {
                var s = p.first(e[r]);
                n[u(s, t)] = e[r]
            }
            return n
        }, p = {
            id: u, update: function (t, n) {
                var r = p.unregisterChildren(t);
                n = e.makeArray(n);
                var i = t.length;
                return f.apply(t, [0, i].concat(n)), t.replacements ? p.nestReplacements(t) : p.nestList(t), r
            }, nestReplacements: function (e) {
                var t = 0, n = {}, r = h(e.replacements, n), i = e.replacements.length;
                while (t < e.length && i) {
                    var s = e[t], o = r[a(s, n)];
                    o && (e.splice(t, c(o), o), i--), t++
                }
                e.replacements = []
            }, nestList: function (e) {
                var t = 0;
                while (t < e.length) {
                    var n = e[t], i = r[u(n)];
                    i ? i !== e && e.splice(t, c(i), i) : r[u(n)] = e, t++
                }
            }, last: function (e) {
                var t = e[e.length - 1];
                return t.nodeType ? t : p.last(t)
            }, first: function (e) {
                var t = e[0];
                return t.nodeType ? t : p.first(t)
            }, register: function (e, t, n) {
                return e.unregistered = t, e.parentList = n, n === !0 ? e.replacements = [] : n ? (n.replacements.push(e), e.replacements = []) : p.nestList(e), e
            }, unregisterChildren: function (t) {
                var n = [];
                return e.each(t, function (e) {
                    e.nodeType ? (t.replacements || delete r[u(e)], n.push(e)) : l.apply(n, p.unregister(e))
                }), n
            }, unregister: function (e) {
                var t = p.unregisterChildren(e);
                if (e.unregistered) {
                    var n = e.unregistered;
                    delete e.unregistered, delete e.replacements, n()
                }
                return t
            }, nodeMap: r
        };
        return e.view.nodeLists = p, p
    }(__m2, __m27), __m31 = function (e) {
        function t(e) {
            var t = {}, n = e.split(",");
            for (var r = 0; r < n.length; r++)t[n[r]] = !0;
            return t
        }

        var n = "-A-Za-z0-9_", r = "[a-zA-Z_:][" + n + ":.]*", i = "\\s*=\\s*", s = '"((?:\\\\.|[^"])*)"', o = "'((?:\\\\.|[^'])*)'", u = "(?:" + i + "(?:" + "(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?", a = "\\{\\{[^\\}]*\\}\\}\\}?", f = "\\{\\{([^\\}]*)\\}\\}\\}?", l = new RegExp("^<([" + n + "]+)" + "(" + "(?:\\s*" + "(?:(?:" + "(?:" + r + ")?" + u + ")|" + "(?:" + a + ")+)" + ")*" + ")\\s*(\\/?)>"), c = new RegExp("^<\\/([" + n + "]+)[^>]*>"), h = new RegExp("(?:(?:(" + r + ")|" + f + ")" + "(?:" + i + "(?:" + "(?:" + s + ")|(?:" + o + ")|([^>\\s]+)" + ")" + ")?)", "g"), p = new RegExp(f, "g"), d = /<|\{\{/, v = t("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"), m = t("address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), g = t("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), y = t("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), b = t("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), w = t("script,style"), E = function (e, t) {
            function n(e, n, i, s) {
                n = n.toLowerCase();
                if (m[n])while (a.last() && g[a.last()])r("", a.last());
                y[n] && a.last() === n && r("", n), s = v[n] || !!s, t.start(n, s), s || a.push(n), E.parseAttrs(i, t), t.end(n, s)
            }

            function r(e, n) {
                var r;
                if (!n)r = 0; else for (r = a.length - 1; r >= 0; r--)if (a[r] === n)break;
                if (r >= 0) {
                    for (var i = a.length - 1; i >= r; i--)t.close && t.close(a[i]);
                    a.length = r
                }
            }

            function i(e, n) {
                t.special && t.special(n)
            }

            var s, o, u, a = [], f = e;
            a.last = function () {
                return this[this.length - 1]
            };
            while (e) {
                o = !0;
                if (!a.last() || !w[a.last()]) {
                    e.indexOf("<!--") === 0 ? (s = e.indexOf("-->"), s >= 0 && (t.comment && t.comment(e.substring(4, s)), e = e.substring(s + 3), o = !1)) : e.indexOf("</") === 0 ? (u = e.match(c), u && (e = e.substring(u[0].length), u[0].replace(c, r), o = !1)) : e.indexOf("<") === 0 ? (u = e.match(l), u && (e = e.substring(u[0].length), u[0].replace(l, n), o = !1)) : e.indexOf("{{") === 0 && (u = e.match(p), u && (e = e.substring(u[0].length), u[0].replace(p, i)));
                    if (o) {
                        s = e.search(d);
                        var h = s < 0 ? e : e.substring(0, s);
                        e = s < 0 ? "" : e.substring(s), t.chars && h && t.chars(h)
                    }
                } else e = e.replace(new RegExp("([\\s\\S]*?)</" + a.last() + "[^>]*>"), function (e, n) {
                    return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(n), ""
                }), r("", a.last());
                if (e === f)throw"Parse Error: " + e;
                f = e
            }
            r(), t.done()
        };
        return E.parseAttrs = function (e, t) {
            (e != null ? e : "").replace(h, function (e, n, r, i, s, o) {
                r && t.special(r);
                if (n || i || s || o) {
                    var u = arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : arguments[5] ? arguments[5] : b[n.toLowerCase()] ? n : "";
                    t.attrStart(n || "");
                    var a = p.lastIndex = 0, f = p.exec(u), l;
                    while (f)l = u.substring(a, p.lastIndex - f[0].length), l.length && t.attrValue(l), t.special(f[1]), a = p.lastIndex, f = p.exec(u);
                    l = u.substr(a, u.length), l && t.attrValue(l), t.attrEnd(n || "")
                }
            })
        }, e.view.parser = E, E
    }(__m13), __m29 = function (e, t, n, r, i) {
        t = t || e.view.elements, r = r || e.view.NodeLists, i = i || e.view.parser;
        var s = function (t, n, r) {
            var i = !1, s = function () {
                return i || (i = !0, r(o), e.unbind.call(t, "removed", s)), !0
            }, o = {
                teardownCheck: function (e) {
                    return e ? !1 : s()
                }
            };
            return e.bind.call(t, "removed", s), n(o), o
        }, o = function (e, t, n) {
            return s(e, function () {
                t.bind("change", n)
            }, function (e) {
                t.unbind("change", n), e.nodeList && r.unregister(e.nodeList)
            })
        }, u = function (e) {
            var t = {}, n;
            return i.parseAttrs(e, {
                attrStart: function (e) {
                    t[e] = "", n = e
                }, attrValue: function (e) {
                    t[n] += e
                }, attrEnd: function () {
                }
            }), t
        }, a = [].splice, f = function (e) {
            return e && e.nodeType
        }, l = function (e) {
            e.childNodes.length || e.appendChild(document.createTextNode(""))
        }, c = {
            list: function (n, i, o, u, f, l) {
                var h = l || [n], p = [], d = function (n, i, s) {
                    var f = document.createDocumentFragment(), c = [], d = [];
                    e.each(i, function (t, n) {
                        var i = [];
                        l && r.register(i, null, !0);
                        var a = e.compute(n + s), h = o.call(u, t, a, i), p = typeof h == "string", v = e.frag(h);
                        v = p ? e.view.hookup(v) : v;
                        var m = e.makeArray(v.childNodes);
                        l ? (r.update(i, m), c.push(i)) : c.push(r.register(m)), f.appendChild(v), d.push(a)
                    });
                    var v = s + 1;
                    if (!h[v])t.after(v === 1 ? [m] : [r.last(h[v - 1])], f); else {
                        var g = r.first(h[v]);
                        e.insertBefore(g.parentNode, f, g)
                    }
                    a.apply(h, [v, 0].concat(c)), a.apply(p, [s, 0].concat(d));
                    for (var y = s + d.length, b = p.length; y < b; y++)p[y](y)
                }, v = function (t, n, i, s, o) {
                    if (!s && w.teardownCheck(m.parentNode))return;
                    var u = h.splice(i + 1, n.length), a = [];
                    e.each(u, function (e) {
                        var t = r.unregister(e);
                        [].push.apply(a, t)
                    }), p.splice(i, n.length);
                    for (var f = i, l = p.length; f < l; f++)p[f](f);
                    o || e.remove(e.$(a))
                }, m = document.createTextNode(""), g, y = function (e) {
                    g && g.unbind && g.unbind("add", d).unbind("remove", v), v({}, {length: h.length - 1}, 0, !0, e)
                }, b = function (e, t, n) {
                    y(), g = t || [], g.bind && g.bind("add", d).bind("remove", v), d({}, g, 0)
                };
                f = t.getParentNode(n, f);
                var w = s(f, function () {
                    e.isFunction(i) && i.bind("change", b)
                }, function () {
                    e.isFunction(i) && i.unbind("change", b), y(!0)
                });
                l ? (t.replace(h, m), r.update(h, [m]), l.unregistered = w.teardownCheck) : c.replace(h, m, w.teardownCheck), b({}, e.isFunction(i) ? i() : i)
            }, html: function (n, i, s, u) {
                var a;
                s = t.getParentNode(n, s), a = o(s, i, function (e, t, n) {
                    var i = r.first(c).parentNode;
                    i && h(t), a.teardownCheck(r.first(c).parentNode)
                });
                var c = u || [n], h = function (n) {
                    var i = !f(n), o = e.frag(n), u = e.makeArray(c);
                    l(o), i && (o = e.view.hookup(o, s)), u = r.update(c, o.childNodes), t.replace(u, o)
                };
                a.nodeList = c, u ? u.unregistered = a.teardownCheck : r.register(c, a.teardownCheck), h(i())
            }, replace: function (n, i, s) {
                var o = n.slice(0), u = e.frag(i);
                return r.register(n, s), typeof i == "string" && (u = e.view.hookup(u, n[0].parentNode)), r.update(n, u.childNodes), t.replace(o, u), n
            }, text: function (n, i, s, u) {
                var a = t.getParentNode(n, s), f = o(a, i, function (t, n, r) {
                    typeof l.nodeValue != "unknown" && (l.nodeValue = e.view.toStr(n)), f.teardownCheck(l.parentNode)
                }), l = document.createTextNode(e.view.toStr(i()));
                u ? (u.unregistered = f.teardownCheck, f.nodeList = u, r.update(u, [l]), t.replace([n], l)) : f.nodeList = c.replace([n], l, f.teardownCheck)
            }, setAttributes: function (t, n) {
                var r = u(n);
                for (var i in r)e.attr.set(t, i, r[i])
            }, attributes: function (n, r, i) {
                var s = {}, a = function (r) {
                    var i = u(r), o;
                    for (o in i) {
                        var a = i[o], f = s[o];
                        a !== f && e.attr.set(n, o, a), delete s[o]
                    }
                    for (o in s)t.removeAttr(n, o);
                    s = i
                };
                o(n, r, function (e, t) {
                    a(t)
                }), arguments.length >= 3 ? s = u(i) : a(r())
            }, attributePlaceholder: "__!!__", attributeReplace: /__!!__/g, attribute: function (n, r, i) {
                o(n, i, function (e, i) {
                    t.setAttr(n, r, h.render())
                });
                var s = e.$(n), u;
                u = e.data(s, "hooks"), u || e.data(s, "hooks", u = {});
                var a = t.getAttr(n, r), f = a.split(c.attributePlaceholder), l = [], h;
                l.push(f.shift(), f.join(c.attributePlaceholder)), u[r] ? u[r].computes.push(i) : u[r] = {
                    render: function () {
                        var e = 0, n = a ? a.replace(c.attributeReplace, function () {
                            return t.contentText(h.computes[e++]())
                        }) : t.contentText(h.computes[e++]());
                        return n
                    }, computes: [i], batchNum: undefined
                }, h = u[r], l.splice(1, 0, i()), t.setAttr(n, r, l.join(""))
            }, specialAttribute: function (e, n, r) {
                o(e, r, function (r, i) {
                    t.setAttr(e, n, p(i))
                }), t.setAttr(e, n, p(r()))
            }, simpleAttribute: function (e, n, r) {
                o(e, r, function (r, i) {
                    t.setAttr(e, n, i)
                }), t.setAttr(e, n, r())
            }
        };
        c.attr = c.simpleAttribute, c.attrs = c.attributes;
        var h = /(\r|\n)+/g, p = function (e) {
            var n = /^["'].*["']$/;
            return e = e.replace(t.attrReg, "").replace(h, ""), n.test(e) ? e.substr(1, e.length - 2) : e
        };
        return e.view.live = c, c
    }(__m2, __m27, __m13, __m30, __m31), __m28 = function (e, t, n) {
        var r = [], i = function (e) {
            var n = t.tagMap[e] || "span";
            return n === "span" ? "@@!!@@" : "<" + n + ">" + i(n) + "</" + n + ">"
        }, s = function (t, n) {
            if (typeof t == "string")return t;
            if (!t && t !== 0)return "";
            var i = t.hookup && function (e, n) {
                    t.hookup.call(t, e, n)
                } || typeof t == "function" && t;
            if (i)return n ? "<" + n + " " + e.view.hook(i) + "></" + n + ">" : (r.push(i), "");
            return "" + t
        }, o = function (t, n) {
            return typeof t == "string" || typeof t == "number" ? e.esc(t) : s(t, n)
        }, u = !1, a = function () {
        }, f;
        return e.extend(e.view, {
            live: n, setupLists: function () {
                var t = e.view.lists, n;
                return e.view.lists = function (e, t) {
                    return n = {list: e, renderer: t}, Math.random()
                }, function () {
                    return e.view.lists = t, n
                }
            }, getHooks: function () {
                var e = r.slice(0);
                return f = e, r = [], e
            }, onlytxt: function (e, t) {
                return o(t.call(e))
            }, txt: function (l, c, h, p, d) {
                var v = t.tagMap[c] || "span", m = !1, g, y, b, w = a, E;
                if (u)g = d.call(p); else {
                    if (typeof h == "string" || h === 1)u = !0;
                    var S = e.view.setupLists();
                    w = function () {
                        b.unbind("change", a)
                    }, b = e.compute(d, p, !1), b.bind("change", a), y = S(), g = b(), u = !1, m = b.hasDependencies
                }
                if (y)return w(), "<" + v + e.view.hook(function (e, t) {
                    n.list(e, y.list, y.renderer, p, t)
                }) + "></" + v + ">";
                if (!m || typeof g == "function")return w(), (u || l === 2 || !l ? s : o)(g, h === 0 && v);
                var x = t.tagToContentPropMap[c];
                return h === 0 && !x ? "<" + v + e.view.hook(l && typeof g != "object" ? function (e, t) {
                    n.text(e, b, t), w()
                } : function (e, t) {
                    n.html(e, b, t), w()
                }) + ">" + i(v) + "</" + v + ">" : h === 1 ? (r.push(function (e) {
                    n.attributes(e, b, b()), w()
                }), b()) : l === 2 ? (E = h, r.push(function (e) {
                    n.specialAttribute(e, E, b), w()
                }), b()) : (E = h === 0 ? x : h, (h === 0 ? f : r).push(function (e) {
                    n.attribute(e, E, b), w()
                }), n.attributePlaceholder)
            }
        }), e
    }(__m13, __m27, __m29, __m16), __m24 = function (e) {
        e.view.ext = ".mustache";
        var t = "scope", n = "___h4sh", r = "{scope:" + t + ",options:options}", i = "{scope:" + t + ",options:options, special: true}", s = t + ",options", o = /((([^'"\s]+?=)?('.*?'|".*?"))|.*?)\s/g, u = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/, a = function (e) {
            return '{get:"' + e.replace(/"/g, '\\"') + '"}'
        }, f = function (e) {
            return e && typeof e.get == "string"
        }, l = function (t) {
            return t instanceof e.Map || t && !!t._get
        }, c = function (e) {
            return e && e.splice && typeof e.length == "number"
        }, h = function (t, n, r) {
            var i = function (e, r) {
                return t(e || n, r)
            };
            return function (t, s) {
                return t !== undefined && !(t instanceof e.view.Scope) && (t = n.add(t)), s !== undefined && !(s instanceof e.view.Options) && (s = r.add(s)), i(t, s || r)
            }
        }, p = function (t, n) {
            if (this.constructor !== p) {
                var r = new p(t);
                return function (e, t) {
                    return r.render(e, t)
                }
            }
            if (typeof t == "function") {
                this.template = {fn: t};
                return
            }
            e.extend(this, t), this.template = this.scanner.scan(this.text, this.name)
        };
        e.Mustache = window.Mustache = p, p.prototype.render = function (t, n) {
            return t instanceof e.view.Scope || (t = new e.view.Scope(t || {})), n instanceof e.view.Options || (n = new e.view.Options(n || {})), n = n || {}, this.template.fn.call(t, t, n)
        }, e.extend(p.prototype, {
            scanner: new e.view.Scanner({
                text: {
                    start: "",
                    scope: t,
                    options: ",options: options",
                    argNames: s
                },
                tokens: [["returnLeft", "{{{", "{{[{&]"], ["commentFull", "{{!}}", "^[\\s\\t]*{{!.+?}}\\n"], ["commentLeft", "{{!", "(\\n[\\s\\t]*{{!|{{!)"], ["escapeFull", "{{}}", "(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)", function (e) {
                    return {before: /^\n.+?\n$/.test(e) ? "\n" : "", content: e.match(/\{\{(.+?)\}\}/)[1] || ""}
                }], ["escapeLeft", "{{"], ["returnRight", "}}}"], ["right", "}}"]],
                helpers: [{
                    name: /^>[\s]*\w*/, fn: function (t, n) {
                        var r = e.trim(t.replace(/^>\s?/, "")).replace(/["|']/g, "");
                        return "can.Mustache.renderPartial('" + r + "'," + s + ")"
                    }
                }, {
                    name: /^\s*data\s/, fn: function (e, n) {
                        var r = e.match(/["|'](.*)["|']/)[1];
                        return "can.proxy(function(__){can.data(can.$(__),'" + r + "', this.attr('.')); }, " + t + ")"
                    }
                }, {
                    name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/, fn: function (e) {
                        var n = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, r = e.match(n);
                        return "can.proxy(function(__){var " + r[1] + "=can.$(__);with(" + t + ".attr('.')){" + r[2] + "}}, this);"
                    }
                }, {
                    name: /^.*$/, fn: function (t, f) {
                        var l = !1, c = {content: "", startTxt: !1, startOnlyTxt: !1, end: !1};
                        t = e.trim(t);
                        if (t.length && (l = t.match(/^([#^/]|else$)/))) {
                            l = l[0];
                            switch (l) {
                                case"#":
                                case"^":
                                    f.specialAttribute ? c.startOnlyTxt = !0 : (c.startTxt = !0, c.escaped = 0);
                                    break;
                                case"/":
                                    return c.end = !0, c.content += 'return ___v1ew.join("");}}])', c
                            }
                            t = t.substring(1)
                        }
                        if (l !== "else") {
                            var h = [], p = [], d = 0, v;
                            c.content += "can.Mustache.txt(\n" + (f.specialAttribute ? i : r) + ",\n" + (l ? '"' + l + '"' : "null") + ",", (e.trim(t) + " ").replace(o, function (e, t) {
                                d && (v = t.match(u)) ? v[2] ? h.push(v[0]) : p.push(v[4] + ":" + (v[6] ? v[6] : a(v[5]))) : h.push(a(t)), d++
                            }), c.content += h.join(","), p.length && (c.content += ",{" + n + ":{" + p.join(",") + "}}")
                        }
                        l && l !== "else" && (c.content += ",[\n\n");
                        switch (l) {
                            case"^":
                            case"#":
                                c.content += "{fn:function(" + s + "){var ___v1ew = [];";
                                break;
                            case"else":
                                c.content += 'return ___v1ew.join("");}},\n{inverse:function(' + s + "){\nvar ___v1ew = [];";
                                break;
                            default:
                                c.content += ")"
                        }
                        return l || (c.startTxt = !0, c.end = !0), c
                    }
                }]
            })
        });
        var d = e.view.Scanner.prototype.helpers;
        for (var v = 0; v < d.length; v++)p.prototype.scanner.helpers.unshift(d[v]);
        return p.txt = function (t, r, i) {
            var s = t.scope, o = t.options, u = [], a = {
                fn: function () {
                }, inverse: function () {
                }
            }, d, v = s.attr("."), m = !0, g;
            for (var y = 3; y < arguments.length; y++) {
                var b = arguments[y];
                if (r && e.isArray(b))a = e.extend.apply(e, [a].concat(b)); else if (b && b[n]) {
                    d = b[n];
                    for (var w in d)f(d[w]) && (d[w] = p.get(d[w].get, t, !1, !0))
                } else b && f(b) ? u.push(p.get(b.get, t, !1, !0, !0)) : u.push(b)
            }
            if (f(i)) {
                var E = i.get;
                i = p.get(i.get, t, u.length, !1), m = E === i
            }
            a.fn = h(a.fn, s, o), a.inverse = h(a.inverse, s, o);
            if (r === "^") {
                var S = a.fn;
                a.fn = a.inverse, a.inverse = S
            }
            return (g = m && typeof i == "string" && p.getHelper(i, o) || e.isFunction(i) && !i.isComputed && {fn: i}) ? (e.extend(a, {
                context: v,
                scope: s,
                contexts: s,
                hash: d
            }), u.push(a), function () {
                return g.fn.apply(v, u) || ""
            }) : function () {
                var t;
                e.isFunction(i) && i.isComputed ? t = i() : t = i;
                var n = u.length ? u : [t], s = !0, o = [], f, h, p;
                if (r)for (f = 0; f < n.length; f++)p = n[f], h = typeof p != "undefined" && l(p), c(p) ? r === "#" ? s = s && (h ? !!p.attr("length") : !!p.length) : r === "^" && (s = s && (h ? !p.attr("length") : !p.length)) : s = r === "#" ? s && !!p : r === "^" ? s && !p : s;
                if (s) {
                    if (r === "#") {
                        if (c(t)) {
                            var d = l(t);
                            for (f = 0; f < t.length; f++)o.push(a.fn(d ? t.attr("" + f) : t[f]));
                            return o.join("")
                        }
                        return a.fn(t || {}) || ""
                    }
                    return r === "^" ? a.inverse(t || {}) || "" : "" + (t != null ? t : "")
                }
                return ""
            }
        }, p.get = function (t, n, r, i, s) {
            var o = n.scope.attr("."), u = n.options || {};
            if (r) {
                if (p.getHelper(t, u))return t;
                if (n.scope && e.isFunction(o[t]))return o[t]
            }
            var a = n.scope.computeData(t, {isArgument: i, args: [o, n.scope]}), f = a.compute;
            e.compute.temporarilyBind(f);
            var l = a.initialValue;
            return !s && (l === undefined || a.scope !== n.scope) && p.getHelper(t, u) ? t : f.hasDependencies ? f : l
        }, p.resolve = function (t) {
            return l(t) && c(t) && t.attr("length") ? t : e.isFunction(t) ? t() : t
        }, e.view.Options = e.view.Scope.extend({
            init: function (t, n) {
                !t.helpers && !t.partials && !t.tags && (t = {helpers: t}), e.view.Scope.prototype.init.apply(this, arguments)
            }
        }), p._helpers = {}, p.registerHelper = function (e, t) {
            this._helpers[e] = {name: e, fn: t}
        }, p.getHelper = function (e, t) {
            var n = t.attr("helpers." + e);
            return n ? {fn: n} : this._helpers[e]
        }, p.render = function (t, n, r) {
            if (!e.view.cached[t]) {
                var i = e.__clearReading();
                n.attr("partial") && (t = n.attr("partial")), e.__setReading(i)
            }
            return e.view.render(t, n, r)
        }, p.safeString = function (e) {
            return {
                toString: function () {
                    return e
                }
            }
        }, p.renderPartial = function (t, n, r) {
            var i = r.attr("partials." + t);
            return i ? i.render ? i.render(n, r) : i(n, r) : e.Mustache.render(t, n, r)
        }, e.each({
            "if": function (t, n) {
                var r;
                return e.isFunction(t) ? r = e.compute.truthy(t)() : r = !!p.resolve(t), r ? n.fn(n.contexts || this) : n.inverse(n.contexts || this)
            }, unless: function (t, n) {
                return p._helpers["if"].fn.apply(this, [e.isFunction(t) ? e.compute(function () {
                    return !t()
                }) : !t, n])
            }, each: function (t, n) {
                var r = p.resolve(t), i = [], s, o, u;
                if (e.view.lists && (r instanceof e.List || t && t.isComputed && r === undefined))return e.view.lists(t, function (e, t) {
                    return n.fn(n.scope.add({"@index": t}).add(e))
                });
                t = r;
                if (!!t && c(t)) {
                    for (u = 0; u < t.length; u++)i.push(n.fn(n.scope.add({"@index": u}).add(t[u])));
                    return i.join("")
                }
                if (l(t)) {
                    s = e.Map.keys(t);
                    for (u = 0; u < s.length; u++)o = s[u], i.push(n.fn(n.scope.add({"@key": o}).add(t[o])));
                    return i.join("")
                }
                if (t instanceof Object) {
                    for (o in t)i.push(n.fn(n.scope.add({"@key": o}).add(t[o])));
                    return i.join("")
                }
            }, "with": function (e, t) {
                var n = e;
                e = p.resolve(e);
                if (!!e)return t.fn(n)
            }, log: function (e, t) {
                typeof console != "undefined" && console.log && (t ? console.log(e, t.context) : console.log(e.context))
            }, "@index": function (t, n) {
                n || (n = t, t = 0);
                var r = n.scope.attr("@index");
                return "" + ((e.isFunction(r) ? r() : r) + t)
            }
        }, function (e, t) {
            p.registerHelper(t, e)
        }), e.view.register({
            suffix: "mustache", contentType: "x-mustache-template", script: function (e, t) {
                return "can.Mustache(function(" + s + ") { " + (new p({text: t, name: e})).template.out + " })"
            }, renderer: function (e, t) {
                return p({text: t, name: e})
            }
        }), e.mustache.registerHelper = e.proxy(e.Mustache.registerHelper, e.Mustache), e.mustache.safeString = e.Mustache.safeString, e
    }(__m2, __m25, __m13, __m26, __m23, __m28), __m32 = function (e) {
        var t = function () {
            var e = {"": !0, "true": !0, "false": !1}, t = function (t) {
                if (!t || !t.getAttribute)return;
                var n = t.getAttribute("contenteditable");
                return e[n]
            };
            return function (e) {
                var n = t(e);
                return typeof n == "boolean" ? n : !!t(e.parentNode)
            }
        }(), n = function (e) {
            return e[0] === "{" && e[e.length - 1] === "}" ? e.substr(1, e.length - 2) : e
        };
        e.view.attr("can-value", function (r, a) {
            var f = n(r.getAttribute("can-value")), l = a.scope.computeData(f, {args: []}).compute, c, h;
            if (r.nodeName.toLowerCase() === "input") {
                r.type === "checkbox" && (e.attr.has(r, "can-true-value") ? c = r.getAttribute("can-true-value") : c = !0, e.attr.has(r, "can-false-value") ? h = r.getAttribute("can-false-value") : h = !1);
                if (r.type === "checkbox" || r.type === "radio") {
                    new s(r, {value: l, trueValue: c, falseValue: h});
                    return
                }
            }
            if (r.nodeName.toLowerCase() === "select" && r.multiple) {
                new o(r, {value: l});
                return
            }
            if (t(r)) {
                new u(r, {value: l});
                return
            }
            new i(r, {value: l})
        });
        var r = {
            enter: function (e, t, n) {
                return {
                    event: "keyup", handler: function (e) {
                        if (e.keyCode === 13)return n.call(this, e)
                    }
                }
            }
        };
        e.view.attr(/can-[\w\.]+/, function (t, i) {
            var s = i.attributeName, o = s.substr("can-".length), u = function (r) {
                var o = n(t.getAttribute(s)), u = i.scope.read(o, {returnObserveMethods: !0, isArgument: !0});
                return u.value.call(u.parent, i.scope._context, e.$(this), r)
            };
            if (r[o]) {
                var a = r[o](i, t, u);
                u = a.handler, o = a.event
            }
            e.bind.call(t, o, u)
        });
        var i = e.Control.extend({
            init: function () {
                this.element[0].nodeName.toUpperCase() === "SELECT" ? setTimeout(e.proxy(this.set, this), 1) : this.set()
            }, "{value} change": "set", set: function () {
                if (!this.element)return;
                var e = this.options.value();
                this.element[0].value = e == null ? "" : e
            }, change: function () {
                if (!this.element)return;
                this.options.value(this.element[0].value)
            }
        }), s = e.Control.extend({
            init: function () {
                this.isCheckbox = this.element[0].type.toLowerCase() === "checkbox", this.check()
            }, "{value} change": "check", check: function () {
                if (this.isCheckbox) {
                    var t = this.options.value(), n = this.options.trueValue || !0;
                    this.element[0].checked = t === n
                } else {
                    var r = this.options.value() == this.element[0].value ? "set" : "remove";
                    e.attr[r](this.element[0], "checked", !0)
                }
            }, change: function () {
                this.isCheckbox ? this.options.value(this.element[0].checked ? this.options.trueValue : this.options.falseValue) : this.element[0].checked && this.options.value(this.element[0].value)
            }
        }), o = i.extend({
            init: function () {
                this.delimiter = ";", this.set()
            }, set: function () {
                var t = this.options.value();
                typeof t == "string" ? (t = t.split(this.delimiter), this.isString = !0) : t && (t = e.makeArray(t));
                var n = {};
                e.each(t, function (e) {
                    n[e] = !0
                }), e.each(this.element[0].childNodes, function (e) {
                    e.value && (e.selected = !!n[e.value])
                })
            }, get: function () {
                var t = [], n = this.element[0].childNodes;
                return e.each(n, function (e) {
                    e.selected && e.value && t.push(e.value)
                }), t
            }, change: function () {
                var t = this.get(), n = this.options.value();
                this.isString || typeof n == "string" ? (this.isString = !0, this.options.value(t.join(this.delimiter))) : n instanceof e.List ? n.attr(t, !0) : this.options.value(t)
            }
        }), u = e.Control.extend({
            init: function () {
                this.set(), this.on("blur", "setValue")
            }, "{value} change": "set", set: function () {
                var e = this.options.value();
                this.element[0].innerHTML = typeof e == "undefined" ? "" : e
            }, setValue: function () {
                this.options.value(this.element[0].innerHTML)
            }
        })
    }(__m2, __m24, __m14), __m1 = function (e, t) {
        var n = /^(dataViewId|class|id)$/i, r = /\{([^\}]+)\}/g, i = e.Component = e.Construct.extend({
            setup: function () {
                e.Construct.setup.apply(this, arguments);
                if (e.Component) {
                    var t = this, n = this.prototype.scope;
                    this.Control = s.extend(this.prototype.events), !n || typeof n == "object" && !(n instanceof e.Map) ? this.Map = e.Map.extend(n || {}) : n.prototype instanceof e.Map && (this.Map = n), this.attributeScopeMappings = {}, e.each(this.Map ? this.Map.defaults : {}, function (e, n) {
                        e === "@" && (t.attributeScopeMappings[n] = n)
                    });
                    if (this.prototype.template)if (typeof this.prototype.template == "function") {
                        var r = this.prototype.template;
                        this.renderer = function () {
                            return e.view.frag(r.apply(null, arguments))
                        }
                    } else this.renderer = e.view.mustache(this.prototype.template);
                    e.view.tag(this.prototype.tag, function (e, n) {
                        new t(e, n)
                    })
                }
            }
        }, {
            setup: function (r, i) {
                var s = {}, o = this, u = {}, a, f, l;
                e.each(this.constructor.attributeScopeMappings, function (t, n) {
                    s[n] = r.getAttribute(e.hyphenate(t))
                }), e.each(e.makeArray(r.attributes), function (l, c) {
                    var h = e.camelize(l.nodeName.toLowerCase()), p = l.value;
                    if (o.constructor.attributeScopeMappings[h] || n.test(h) || t.attr(l.nodeName))return;
                    if (p[0] === "{" && p[p.length - 1] === "}")p = p.substr(1, p.length - 2); else if (i.templateType !== "legacy") {
                        s[h] = p;
                        return
                    }
                    var d = i.scope.computeData(p, {args: []}), v = d.compute, m = function (e, t) {
                        a = h, f.attr(h, t), a = null
                    };
                    v.bind("change", m), s[h] = v(), v.hasDependencies ? (e.bind.call(r, "removed", function () {
                        v.unbind("change", m)
                    }), u[h] = d) : v.unbind("change", m)
                });
                if (this.constructor.Map)f = new this.constructor.Map(s); else if (this.scope instanceof e.Map)f = this.scope; else if (e.isFunction(this.scope)) {
                    var c = this.scope(s, i.scope, r);
                    c instanceof e.Map ? f = c : c.prototype instanceof e.Map ? f = new c(s) : f = new (e.Map.extend(c))(s)
                }
                var h = {};
                e.each(u, function (e, t) {
                    h[t] = function (n, r) {
                        a !== t && e.compute(r)
                    }, f.bind(t, h[t])
                }), e.bind.call(r, "removed", function () {
                    e.each(h, function (e, t) {
                        f.unbind(t, h[t])
                    })
                }), (!e.isEmptyObject(this.constructor.attributeScopeMappings) || i.templateType !== "legacy") && e.bind.call(r, "attributes", function (t) {
                    var i = e.camelize(t.attributeName);
                    !u[i] && !n.test(i) && f.attr(i, r.getAttribute(t.attributeName))
                }), this.scope = f, e.data(e.$(r), "scope", this.scope);
                var p = i.scope.add(this.scope), d = {helpers: {}};
                e.each(this.helpers || {}, function (t, n) {
                    e.isFunction(t) && (d.helpers[n] = function () {
                        return t.apply(f, arguments)
                    })
                }), this._control = new this.constructor.Control(r, {scope: this.scope}), this.constructor.renderer ? (d.tags || (d.tags = {}), d.tags.content = function v(t, n) {
                    var r = i.subtemplate || n.subtemplate;
                    r && (delete d.tags.content, e.view.live.replace([t], r(n.scope, n.options)), d.tags.content = v)
                }, l = this.constructor.renderer(p, i.options.add(d))) : i.templateType === "legacy" ? l = e.view.frag(i.subtemplate ? i.subtemplate(p, i.options.add(d)) : "") : l = i.subtemplate ? i.subtemplate(p, i.options.add(d)) : document.createDocumentFragment(), e.appendChild(r, l)
            }
        }), s = e.Control.extend({
            _lookup: function (e) {
                return [e.scope, e, window]
            }, _action: function (t, n, i) {
                var s, o;
                r.lastIndex = 0, s = r.test(t);
                if (!i && s)return;
                if (!s)return e.Control._action.apply(this, arguments);
                o = e.compute(function () {
                    var i, s = t.replace(r, function (t, r) {
                        var s;
                        return r === "scope" ? (i = n.scope, "") : (r = r.replace(/^scope\./, ""), s = e.compute.read(n.scope, r.split("."), {isArgument: !0}).value, s === undefined && (s = e.getObject(r)), typeof s == "string" ? s : (i = s, ""))
                    }), o = s.split(/\s+/g), u = o.pop();
                    return {
                        processor: this.processors[u] || this.processors.click,
                        parts: [s, o.join(" "), u],
                        delegate: i || undefined
                    }
                }, this);
                var u = function (e, n) {
                    i._bindings.control[t](i.element), i._bindings.control[t] = n.processor(n.delegate || i.element, n.parts[2], n.parts[1], t, i)
                };
                return o.bind("change", u), i._bindings.readyComputes[t] = {compute: o, handler: u}, o()
            }
        }, {
            setup: function (t, n) {
                return this.scope = n.scope, e.Control.prototype.setup.call(this, t, n)
            }, off: function () {
                this._bindings && e.each(this._bindings.readyComputes || {}, function (e) {
                    e.compute.unbind("change", e.handler)
                }), e.Control.prototype.off.apply(this, arguments), this._bindings.readyComputes = {}
            }
        });
        return window.$ && $.fn && ($.fn.scope = function (e) {
            return e ? this.data("scope").attr(e) : this.data("scope")
        }), e.scope = function (t, n) {
            return t = e.$(t), n ? e.data(t, "scope").attr(n) : e.data(t, "scope")
        }, i
    }(__m2, __m12, __m14, __m17, __m24, __m32), __m33 = function (e) {
        var t = function (t, n, r) {
            var i = new e.Deferred;
            return t.then(function () {
                var t = e.makeArray(arguments), s = !0;
                try {
                    t[0] = r.apply(n, t)
                } catch (o) {
                    s = !1, i.rejectWith(i, [o].concat(t))
                }
                s && i.resolveWith(i, t)
            }, function () {
                i.rejectWith(this, arguments)
            }), typeof t.abort == "function" && (i.abort = function () {
                return t.abort()
            }), i
        }, n = 0, r = function (t) {
            return e.__reading(t, t.constructor.id), t.__get(t.constructor.id)
        }, i = function (t, n, r, i, s, o) {
            var u = {};
            if (typeof t == "string") {
                var a = t.split(/\s+/);
                u.url = a.pop(), a.length && (u.type = a.pop())
            } else e.extend(u, t);
            return u.data = typeof n == "object" && !e.isArray(n) ? e.extend(u.data || {}, n) : n, u.url = e.sub(u.url, u.data, !0), e.ajax(e.extend({
                type: r || "post",
                dataType: i || "json",
                success: s,
                error: o
            }, u))
        }, s = function (n, i, s, o, u) {
            var a;
            e.isArray(n) ? (a = n[1], n = n[0]) : a = n.serialize(), a = [a];
            var f, l = n.constructor, c;
            return (i === "update" || i === "destroy") && a.unshift(r(n)), c = l[i].apply(l, a), f = t(c, n, function (e) {
                return n[u || i + "d"](e, c), n
            }), c.abort && (f.abort = function () {
                c.abort()
            }), f.then(s, o), f
        }, o = {
            models: function (t) {
                return function (n, r) {
                    e.Model._reqs++;
                    if (!n)return;
                    if (n instanceof this.List)return n;
                    var i = this, s = [], o = i.List || v, u = r instanceof e.List ? r : new o, a = e.isArray(n), f = n instanceof v, l = a ? n : f ? n.serialize() : e.getObject(t || "data", n);
                    if (typeof l == "undefined")throw new Error("Could not get any raw data while converting using .models");
                    return u.length && u.splice(0), e.each(l, function (e) {
                        s.push(i.model(e))
                    }), u.push.apply(u, s), a || e.each(n, function (e, t) {
                        t !== "data" && u.attr(t, e)
                    }), setTimeout(e.proxy(this._clean, this), 1), u
                }
            }, model: function (t) {
                return function (n) {
                    if (!n)return;
                    typeof n.serialize == "function" && (n = n.serialize()), this.parseModel ? n = this.parseModel.apply(this, arguments) : t && (n = e.getObject(t || "data", n));
                    var r = n[this.id], i = (r || r === 0) && this.store[r] ? this.store[r].attr(n, this.removeAttr || !1) : new this(n);
                    return i
                }
            }
        }, u = function (t) {
            return function (n) {
                return t ? e.getObject(t || "data", n) : n
            }
        }, a = {parseModel: u, parseModels: u}, f = {
            create: {url: "_shortName", type: "post"},
            update: {
                data: function (t, n) {
                    n = n || {};
                    var r = this.id;
                    return n[r] && n[r] !== t && (n["new" + e.capitalize(t)] = n[r], delete n[r]), n[r] = t, n
                }, type: "put"
            },
            destroy: {
                type: "delete", data: function (e, t) {
                    return t = t || {}, t.id = t[this.id] = e, t
                }
            },
            findAll: {url: "_shortName"},
            findOne: {}
        }, l = function (e, t) {
            return function (n) {
                return n = e.data ? e.data.apply(this, arguments) : n, i(t || this[e.url || "_url"], n, e.type || "get")
            }
        }, c = function (e, t) {
            if (!e.resource)return;
            var n = e.resource.replace(/\/+$/, "");
            return t === "findAll" || t === "create" ? n : n + "/{" + e.id + "}"
        };
        e.Model = e.Map.extend({
            fullName: "can.Model", _reqs: 0, setup: function (t, r, i, s) {
                typeof r != "string" && (s = i, i = r), s || (s = i), this.store = {}, e.Map.setup.apply(this, arguments);
                if (!e.Model)return;
                i && i.List ? (this.List = i.List, this.List.Map = this) : this.List = t.List.extend({Map: this}, {});
                var u = this, h = e.proxy(this._clean, u);
                e.each(f, function (n, r) {
                    i && i[r] && (typeof i[r] == "string" || typeof i[r] == "object") ? u[r] = l(n, i[r]) : i && i.resource && (u[r] = l(n, c(u, r)));
                    if (u["make" + e.capitalize(r)]) {
                        var s = u["make" + e.capitalize(r)](u[r]);
                        e.Construct._overwrite(u, t, r, function () {
                            e.Model._reqs++;
                            var t = s.apply(this, arguments), n = t.then(h, h);
                            return n.abort = t.abort, n
                        })
                    }
                }), e.each(o, function (n, r) {
                    var s = "parse" + e.capitalize(r), o = u[r];
                    typeof o == "string" ? (e.Construct._overwrite(u, t, s, a[s](o)), e.Construct._overwrite(u, t, r, n(o))) : (!i || !i[r] && !i[s]) && e.Construct._overwrite(u, t, s, a[s]())
                }), e.each(a, function (n, r) {
                    typeof u[r] == "string" && e.Construct._overwrite(u, t, r, n(u[r]))
                });
                if (u.fullName === "can.Model" || !u.fullName)u.fullName = "Model" + ++n;
                e.Model._reqs = 0, this._url = this._shortName + "/{" + this.id + "}"
            }, _ajax: l, _makeRequest: s, _clean: function () {
                e.Model._reqs--;
                if (!e.Model._reqs)for (var t in this.store)this.store[t]._bindings || delete this.store[t];
                return arguments[0]
            }, models: o.models("data"), model: o.model()
        }, {
            setup: function (t) {
                var n = t && t[this.constructor.id];
                e.Model._reqs && n != null && (this.constructor.store[n] = this), e.Map.prototype.setup.apply(this, arguments)
            }, isNew: function () {
                var e = r(this);
                return !e && e !== 0
            }, save: function (e, t) {
                return s(this, this.isNew() ? "create" : "update", e, t)
            }, destroy: function (t, n) {
                if (this.isNew()) {
                    var r = this, i = e.Deferred();
                    return i.then(t, n), i.done(function (e) {
                        r.destroyed(e)
                    }).resolve(r)
                }
                return s(this, "destroy", t, n, "destroyed")
            }, _bindsetup: function () {
                return this.constructor.store[this.__get(this.constructor.id)] = this, e.Map.prototype._bindsetup.apply(this, arguments)
            }, _bindteardown: function () {
                return delete this.constructor.store[r(this)], e.Map.prototype._bindteardown.apply(this, arguments)
            }, ___set: function (t, n) {
                e.Map.prototype.___set.call(this, t, n), t === this.constructor.id && this._bindings && (this.constructor.store[r(this)] = this)
            }
        });
        var h = function (t) {
            var n = "parse" + e.capitalize(t);
            return function (e) {
                return this[n] && (e = this[n].apply(this, arguments)), this[t](e)
            }
        }, p = function (e) {
            return this.parseModel ? this.parseModel.apply(this, arguments) : this.model(e)
        }, d = {makeFindAll: h("models"), makeFindOne: h("model"), makeCreate: p, makeUpdate: p};
        e.each(d, function (n, r) {
            e.Model[r] = function (r) {
                return function () {
                    var i = e.makeArray(arguments), s = e.isFunction(i[1]) ? i.splice(0, 1) : i.splice(0, 2), o = t(r.apply(this, s), this, n);
                    return o.then(i[0], i[1]), o
                }
            }
        }), e.each(["created", "updated", "destroyed"], function (t) {
            e.Model.prototype[t] = function (n) {
                var r, i = this.constructor;
                r = n && typeof n == "object" && this.attr(n.attr ? n.attr() : n), e.dispatch.call(this, {
                    type: "change",
                    target: this
                }, [t]), e.dispatch.call(i, t, [this])
            }
        });
        var v = e.Model.List = e.List.extend({
            _bubbleRule: function (t, n) {
                return e.List._bubbleRule(t, n) || "destroyed"
            }
        }, {
            setup: function (t) {
                e.isPlainObject(t) && !e.isArray(t) ? (e.List.prototype.setup.apply(this), this.replace(e.isDeferred(t) ? t : this.constructor.Map.findAll(t))) : e.List.prototype.setup.apply(this, arguments), this._init = 1, this.bind("destroyed", e.proxy(this._destroyed, this)), delete this._init
            }, _destroyed: function (e, t) {
                if (/\w+/.test(t)) {
                    var n;
                    while ((n = this.indexOf(e.target)) > -1)this.splice(n, 1)
                }
            }
        });
        return e.Model
    }(__m2, __m18, __m22), __m35 = function (e) {
        var t = /^\d+$/, n = /([^\[\]]+)|(\[\])/g, r = /([^?#]*)(#.*)?$/, i = function (e) {
            return decodeURIComponent(e.replace(/\+/g, " "))
        };
        return e.extend(e, {
            deparam: function (s) {
                var o = {}, u, a;
                return s && r.test(s) && (u = s.split("&"), e.each(u, function (e) {
                    var r = e.split("="), s = i(r.shift()), u = i(r.join("=")), f = o;
                    if (s) {
                        r = s.match(n);
                        for (var l = 0, c = r.length - 1; l < c; l++)f[r[l]] || (f[r[l]] = t.test(r[l + 1]) || r[l + 1] === "[]" ? [] : {}), f = f[r[l]];
                        a = r.pop(), a === "[]" ? f.push(u) : f[a] = u
                    }
                })), o
            }
        }), e
    }(__m2, __m16), __m34 = function (e) {
        var t = /\:([\w\.]+)/g, n = /^(?:&[^=]+=[^&]*)+/, r = function (t) {
            var n = [];
            return e.each(t, function (t, r) {
                n.push((r === "className" ? "class" : r) + '="' + (r === "href" ? t : e.esc(t)) + '"')
            }), n.join(" ")
        }, i = function (e, t) {
            var n = 0, r = 0, i = {};
            for (var s in e.defaults)e.defaults[s] === t[s] && (i[s] = 1, n++);
            for (; r < e.names.length; r++) {
                if (!t.hasOwnProperty(e.names[r]))return -1;
                i[e.names[r]] || n++
            }
            return n
        }, s = window.location, o = function (e) {
            return (e + "").replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1")
        }, u = e.each, a = e.extend, f = function (t) {
            return t && typeof t == "object" ? (t instanceof e.Map ? t = t.attr() : t = e.isFunction(t.slice) ? t.slice() : e.extend({}, t), e.each(t, function (e, n) {
                t[n] = f(e)
            })) : t !== undefined && t !== null && e.isFunction(t.toString) && (t = t.toString()), t
        }, l = function (e) {
            return e.replace(/\\/g, "")
        }, c, h, p, d, v = function (t, n, r, i) {
            d = 1, clearTimeout(c), c = setTimeout(function () {
                d = 0;
                var t = e.route.data.serialize(), n = e.route.param(t, !0);
                e.route._call("setURL", n), e.batch.trigger(m, "__url", [n, p]), p = n
            }, 10)
        }, m = e.extend({}, e.event);
        e.route = function (n, r) {
            var i = e.route._call("root");
            i.lastIndexOf("/") === i.length - 1 && n.indexOf("/") === 0 && (n = n.substr(1)), r = r || {};
            var s = [], u, a = "", f = t.lastIndex = 0, c, h = e.route._call("querySeparator"), p = e.route._call("matchSlashes");
            while (u = t.exec(n))s.push(u[1]), a += l(n.substring(f, t.lastIndex - u[0].length)), c = "\\" + (l(n.substr(t.lastIndex, 1)) || h + (p ? "" : "|/")), a += "([^" + c + "]" + (r[u[1]] ? "*" : "+") + ")", f = t.lastIndex;
            return a += n.substr(f).replace("\\", ""), e.route.routes[n] = {
                test: new RegExp("^" + a + "($|" + o(h) + ")"),
                route: n,
                names: s,
                defaults: r,
                length: n.split("/").length
            }, e.route
        }, a(e.route, {
            param: function (n, r) {
                var s, o = 0, f, l = n.route, c = 0;
                delete n.route, u(n, function () {
                    c++
                }), u(e.route.routes, function (e, t) {
                    f = i(e, n), f > o && (s = e, o = f);
                    if (f >= c)return !1
                }), e.route.routes[l] && i(e.route.routes[l], n) === o && (s = e.route.routes[l]);
                if (s) {
                    var h = a({}, n), p = s.route.replace(t, function (e, t) {
                        return delete h[t], n[t] === s.defaults[t] ? "" : encodeURIComponent(n[t])
                    }).replace("\\", ""), d;
                    return u(s.defaults, function (e, t) {
                        h[t] === e && delete h[t]
                    }), d = e.param(h), r && e.route.attr("route", s.route), p + (d ? e.route._call("querySeparator") + d : "")
                }
                return e.isEmptyObject(n) ? "" : e.route._call("querySeparator") + e.param(n)
            }, deparam: function (t) {
                var n = e.route._call("root");
                n.lastIndexOf("/") === n.length - 1 && t.indexOf("/") === 0 && (t = t.substr(1));
                var r = {length: -1}, i = e.route._call("querySeparator"), s = e.route._call("paramsMatcher");
                u(e.route.routes, function (e, n) {
                    e.test.test(t) && e.length > r.length && (r = e)
                });
                if (r.length > -1) {
                    var o = t.match(r.test), f = o.shift(), l = t.substr(f.length - (o[o.length - 1] === i ? 1 : 0)), c = l && s.test(l) ? e.deparam(l.slice(1)) : {};
                    return c = a(!0, {}, r.defaults, c), u(o, function (e, t) {
                        e && e !== i && (c[r.names[t]] = decodeURIComponent(e))
                    }), c.route = r.route, c
                }
                return t.charAt(0) !== i && (t = i + t), s.test(t) ? e.deparam(t.slice(1)) : {}
            }, data: new e.Map({}), map: function (t) {
                var n;
                t.prototype instanceof e.Map ? n = new t : n = t, e.route.data = n
            }, routes: {}, ready: function (t) {
                return t !== !0 && (e.route._setup(), e.route.setState()), e.route
            }, url: function (t, n) {
                return n && (t = e.extend({}, e.route.deparam(e.route._call("matchingPartOfURL")), t)), e.route._call("root") + e.route.param(t)
            }, link: function (t, n, i, s) {
                return "<a " + r(a({href: e.route.url(n, s)}, i)) + ">" + t + "</a>"
            }, current: function (t) {
                return e.__reading(m, "__url"), this._call("matchingPartOfURL") === e.route.param(t)
            }, bindings: {
                hashchange: {
                    paramsMatcher: n, querySeparator: "&", matchSlashes: !1, bind: function () {
                        e.bind.call(window, "hashchange", g)
                    }, unbind: function () {
                        e.unbind.call(window, "hashchange", g)
                    }, matchingPartOfURL: function () {
                        return s.href.split(/#!?/)[1] || ""
                    }, setURL: function (e) {
                        return s.hash = "#!" + e, e
                    }, root: "#!"
                }
            }, defaultBinding: "hashchange", currentBinding: null, _setup: function () {
                e.route.currentBinding || (e.route._call("bind"), e.route.bind("change", v), e.route.currentBinding = e.route.defaultBinding)
            }, _teardown: function () {
                e.route.currentBinding && (e.route._call("unbind"), e.route.unbind("change", v), e.route.currentBinding = null), clearTimeout(c), d = 0
            }, _call: function () {
                var t = e.makeArray(arguments), n = t.shift(), r = e.route.bindings[e.route.currentBinding || e.route.defaultBinding], i = r[n];
                return i.apply ? i.apply(r, t) : i
            }
        }), u(["bind", "unbind", "on", "off", "delegate", "undelegate", "removeAttr", "compute", "_get", "__get", "each"], function (t) {
            e.route[t] = function () {
                if (!e.route.data[t])return;
                return e.route.data[t].apply(e.route.data, arguments)
            }
        }), e.route.attr = function (t, n) {
            var r = typeof t, i;
            return n === undefined ? i = arguments : r !== "string" && r !== "number" ? i = [f(t), n] : i = [t, f(n)], e.route.data.attr.apply(e.route.data, i)
        };
        var g = e.route.setState = function () {
            var t = e.route._call("matchingPartOfURL"), n = h;
            h = e.route.deparam(t);
            if (!d || t !== p) {
                e.batch.start();
                for (var r in n)h[r] || e.route.removeAttr(r);
                e.route.attr(h), e.batch.trigger(m, "__url", [t, p]), e.batch.stop()
            }
        };
        return e.route
    }(__m2, __m18, __m22, __m35), __m36 = function (e) {
        return e.Control.processors.route = function (t, n, r, i, s) {
            r = r || "", e.route.routes[r] || (r[0] === "/" && (r = r.substring(1)), e.route(r));
            var o, u = function (t, n, u) {
                if (e.route.attr("route") === r && (t.batchNum === undefined || t.batchNum !== o)) {
                    o = t.batchNum;
                    var a = e.route.attr();
                    delete a.route, e.isFunction(s[i]) ? s[i](a) : s[s[i]](a)
                }
            };
            return e.route.bind("change", u), function () {
                e.route.unbind("change", u)
            }
        }, e
    }(__m2, __m34, __m14);
    return window.can = __m3, __m3
}), function () {
    function e(t, r) {
        function s(e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }

        var i;
        r = r || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = r.touchBoundary || 10, this.layer = t, this.tapDelay = r.tapDelay || 200, this.tapTimeout = r.tapTimeout || 700;
        if (e.notNeeded(t))return;
        var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], u = this;
        for (var a = 0, f = o.length; a < f; a++)u[o[a]] = s(u[o[a]], u);
        n && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, n, r) {
            var i = Node.prototype.removeEventListener;
            e === "click" ? i.call(t, e, n.hijacked || n, r) : i.call(t, e, n, r)
        }, t.addEventListener = function (e, n, r) {
            var i = Node.prototype.addEventListener;
            e === "click" ? i.call(t, e, n.hijacked || (n.hijacked = function (e) {
                    e.propagationStopped || n(e)
                }), r) : i.call(t, e, n, r)
        }), typeof t.onclick == "function" && (i = t.onclick, t.addEventListener("click", function (e) {
            i(e)
        }, !1), t.onclick = null)
    }

    var t = navigator.userAgent.indexOf("Windows Phone") >= 0, n = navigator.userAgent.indexOf("Android") > 0 && !t, r = /iP(ad|hone|od)/.test(navigator.userAgent) && !t, i = r && /OS 4_\d(_\d)?/.test(navigator.userAgent), s = r && /OS [6-7]_\d/.test(navigator.userAgent), o = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case"button":
            case"select":
            case"textarea":
                if (e.disabled)return !0;
                break;
            case"input":
                if (r && e.type === "file" || e.disabled)return !0;
                break;
            case"label":
            case"iframe":
            case"video":
                return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, e.prototype.needsFocus = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case"textarea":
                return !0;
            case"select":
                return !n;
            case"input":
                switch (e.type) {
                    case"button":
                    case"checkbox":
                    case"file":
                    case"image":
                    case"radio":
                    case"submit":
                        return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    }, e.prototype.sendClick = function (e, t) {
        var n, r;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
    }, e.prototype.determineEventType = function (e) {
        return n && e.tagName.toLowerCase() === "select" ? "mousedown" : "click"
    }, e.prototype.focus = function (e) {
        var t;
        r && e.setSelectionRange && e.type.indexOf("date") !== 0 && e.type !== "time" && e.type !== "month" ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, e.prototype.updateScrollParent = function (e) {
        var t, n;
        t = e.fastClickScrollParent;
        if (!t || !t.contains(e)) {
            n = e;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    t = n, e.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, e.prototype.getTargetElementFromEventTarget = function (e) {
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, e.prototype.onTouchStart = function (e) {
        var t, n, s;
        if (e.targetTouches.length > 1)return !0;
        t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0];
        if (r) {
            s = window.getSelection();
            if (s.rangeCount && !s.isCollapsed)return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier)return e.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, e.prototype.touchHasMoved = function (e) {
        var t = e.changedTouches[0], n = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n ? !0 : !1
    }, e.prototype.onTouchMove = function (e) {
        if (!this.trackingClick)return !0;
        if (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e))this.trackingClick = !1, this.targetElement = null;
        return !0
    }, e.prototype.findControl = function (e) {
        return e.control !== undefined ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, e.prototype.onTouchEnd = function (e) {
        var t, o, u, a, f, l = this.targetElement;
        if (!this.trackingClick)return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0, !0;
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout)return !0;
        this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, o = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, s && (f = e.changedTouches[0], l = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), u = l.tagName.toLowerCase();
        if (u === "label") {
            t = this.findControl(l);
            if (t) {
                this.focus(l);
                if (n)return !1;
                l = t
            }
        } else if (this.needsFocus(l)) {
            if (e.timeStamp - o > 100 || r && window.top !== window && u === "input")return this.targetElement = null, !1;
            this.focus(l), this.sendClick(l, e);
            if (!r || u !== "select")this.targetElement = null, e.preventDefault();
            return !1
        }
        if (r && !i) {
            a = l.fastClickScrollParent;
            if (a && a.fastClickLastScrollTop !== a.scrollTop)return !0
        }
        return this.needsClick(l) || (e.preventDefault(), this.sendClick(l, e)), !1
    }, e.prototype.onTouchCancel = function () {
        this.trackingClick = !1, this.targetElement = null
    }, e.prototype.onMouse = function (e) {
        return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0 : !0
    }, e.prototype.onClick = function (e) {
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : e.target.type === "submit" && e.detail === 0 ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
    }, e.prototype.destroy = function () {
        var e = this.layer;
        n && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, e.notNeeded = function (e) {
        var t, r, i, s;
        if (typeof window.ontouchstart == "undefined")return !0;
        r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
        if (r) {
            if (!n)return !0;
            t = document.querySelector("meta[name=viewport]");
            if (t) {
                if (t.content.indexOf("user-scalable=no") !== -1)return !0;
                if (r > 31 && document.documentElement.scrollWidth <= window.outerWidth)return !0
            }
        }
        if (o) {
            i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
            if (i[1] >= 10 && i[2] >= 3) {
                t = document.querySelector("meta[name=viewport]");
                if (t) {
                    if (t.content.indexOf("user-scalable=no") !== -1)return !0;
                    if (document.documentElement.scrollWidth <= window.outerWidth)return !0
                }
            }
        }
        if (e.style.msTouchAction === "none" || e.style.touchAction === "manipulation")return !0;
        s = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
        if (s >= 27) {
            t = document.querySelector("meta[name=viewport]");
            if (t && (t.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))return !0
        }
        return e.style.touchAction === "none" || e.style.touchAction === "manipulation" ? !0 : !1
    }, e.attach = function (t, n) {
        return new e(t, n)
    }, typeof define == "function" && typeof define.amd == "object" && define.amd ? define("fastclick", [], function () {
        return e
    }) : typeof module != "undefined" && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
}(), function (e) {
    e.extend(e.fn, {
        cookie: function (t, n, r) {
            var i, s, o, u;
            if (arguments.length > 1 && String(n) !== "[object Object]") {
                r = e.extend({}, r);
                if (n === null || n === undefined)r.expires = -1;
                return typeof r.expires == "number" && (i = r.expires * 24 * 60 * 60 * 1e3, s = r.expires = new Date, s.setTime(s.getTime() + i)), n = String(n), document.cookie = [encodeURIComponent(t), "=", r.raw ? n : encodeURIComponent(n), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path : "", r.domain ? "; domain=" + r.domain : "", r.secure ? "; secure" : ""].join("")
            }
            return r = n || {}, u = r.raw ? function (e) {
                return e
            } : decodeURIComponent, (o = (new RegExp("(?:^|; )" + encodeURIComponent(t) + "=([^;]*)")).exec(document.cookie)) ? u(o[1]) : null
        }
    })
}(Zepto), define("zepto.cookie", ["zepto"], function () {
}), function () {
    var e = this, t = e._, n = Array.prototype, r = Object.prototype, i = Function.prototype, s = n.push, o = n.slice, u = n.concat, a = r.toString, f = r.hasOwnProperty, l = Array.isArray, c = Object.keys, h = i.bind, p = function (e) {
        return e instanceof p ? e : this instanceof p ? void (this._wrapped = e) : new p(e)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = p), exports._ = p) : e._ = p, p.VERSION = "1.7.0";
    var d = function (e, t, n) {
        if (t === void 0)return e;
        switch (null == n ? 3 : n) {
            case 1:
                return function (n) {
                    return e.call(t, n)
                };
            case 2:
                return function (n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function (n, r, i) {
                    return e.call(t, n, r, i)
                };
            case 4:
                return function (n, r, i, s) {
                    return e.call(t, n, r, i, s)
                }
        }
        return function () {
            return e.apply(t, arguments)
        }
    };
    p.iteratee = function (e, t, n) {
        return null == e ? p.identity : p.isFunction(e) ? d(e, t, n) : p.isObject(e) ? p.matches(e) : p.property(e)
    }, p.each = p.forEach = function (e, t, n) {
        if (null == e)return e;
        t = d(t, n);
        var r, i = e.length;
        if (i === +i)for (r = 0; i > r; r++)t(e[r], r, e); else {
            var s = p.keys(e);
            for (r = 0, i = s.length; i > r; r++)t(e[s[r]], s[r], e)
        }
        return e
    }, p.map = p.collect = function (e, t, n) {
        if (null == e)return [];
        t = p.iteratee(t, n);
        for (var r, i = e.length !== +e.length && p.keys(e), s = (i || e).length, o = Array(s), u = 0; s > u; u++)r = i ? i[u] : u, o[u] = t(e[r], r, e);
        return o
    };
    var v = "Reduce of empty array with no initial value";
    p.reduce = p.foldl = p.inject = function (e, t, n, r) {
        null == e && (e = []), t = d(t, r, 4);
        var i, s = e.length !== +e.length && p.keys(e), o = (s || e).length, u = 0;
        if (arguments.length < 3) {
            if (!o)throw new TypeError(v);
            n = e[s ? s[u++] : u++]
        }
        for (; o > u; u++)i = s ? s[u] : u, n = t(n, e[i], i, e);
        return n
    }, p.reduceRight = p.foldr = function (e, t, n, r) {
        null == e && (e = []), t = d(t, r, 4);
        var i, s = e.length !== +e.length && p.keys(e), o = (s || e).length;
        if (arguments.length < 3) {
            if (!o)throw new TypeError(v);
            n = e[s ? s[--o] : --o]
        }
        for (; o--;)i = s ? s[o] : o, n = t(n, e[i], i, e);
        return n
    }, p.find = p.detect = function (e, t, n) {
        var r;
        return t = p.iteratee(t, n), p.some(e, function (e, n, i) {
            return t(e, n, i) ? (r = e, !0) : void 0
        }), r
    }, p.filter = p.select = function (e, t, n) {
        var r = [];
        return null == e ? r : (t = p.iteratee(t, n), p.each(e, function (e, n, i) {
            t(e, n, i) && r.push(e)
        }), r)
    }, p.reject = function (e, t, n) {
        return p.filter(e, p.negate(p.iteratee(t)), n)
    }, p.every = p.all = function (e, t, n) {
        if (null == e)return !0;
        t = p.iteratee(t, n);
        var r, i, s = e.length !== +e.length && p.keys(e), o = (s || e).length;
        for (r = 0; o > r; r++)if (i = s ? s[r] : r, !t(e[i], i, e))return !1;
        return !0
    }, p.some = p.any = function (e, t, n) {
        if (null == e)return !1;
        t = p.iteratee(t, n);
        var r, i, s = e.length !== +e.length && p.keys(e), o = (s || e).length;
        for (r = 0; o > r; r++)if (i = s ? s[r] : r, t(e[i], i, e))return !0;
        return !1
    }, p.contains = p.include = function (e, t) {
        return null == e ? !1 : (e.length !== +e.length && (e = p.values(e)), p.indexOf(e, t) >= 0)
    }, p.invoke = function (e, t) {
        var n = o.call(arguments, 2), r = p.isFunction(t);
        return p.map(e, function (e) {
            return (r ? t : e[t]).apply(e, n)
        })
    }, p.pluck = function (e, t) {
        return p.map(e, p.property(t))
    }, p.where = function (e, t) {
        return p.filter(e, p.matches(t))
    }, p.findWhere = function (e, t) {
        return p.find(e, p.matches(t))
    }, p.max = function (e, t, n) {
        var r, i, s = -1 / 0, o = -1 / 0;
        if (null == t && null != e) {
            e = e.length === +e.length ? e : p.values(e);
            for (var u = 0, a = e.length; a > u; u++)r = e[u], r > s && (s = r)
        } else t = p.iteratee(t, n), p.each(e, function (e, n, r) {
            i = t(e, n, r), (i > o || i === -1 / 0 && s === -1 / 0) && (s = e, o = i)
        });
        return s
    }, p.min = function (e, t, n) {
        var r, i, s = 1 / 0, o = 1 / 0;
        if (null == t && null != e) {
            e = e.length === +e.length ? e : p.values(e);
            for (var u = 0, a = e.length; a > u; u++)r = e[u], s > r && (s = r)
        } else t = p.iteratee(t, n), p.each(e, function (e, n, r) {
            i = t(e, n, r), (o > i || 1 / 0 === i && 1 / 0 === s) && (s = e, o = i)
        });
        return s
    }, p.shuffle = function (e) {
        for (var t, n = e && e.length === +e.length ? e : p.values(e), r = n.length, i = Array(r), s = 0; r > s; s++)t = p.random(0, s), t !== s && (i[s] = i[t]), i[t] = n[s];
        return i
    }, p.sample = function (e, t, n) {
        return null == t || n ? (e.length !== +e.length && (e = p.values(e)), e[p.random(e.length - 1)]) : p.shuffle(e).slice(0, Math.max(0, t))
    }, p.sortBy = function (e, t, n) {
        return t = p.iteratee(t, n), p.pluck(p.map(e, function (e, n, r) {
            return {value: e, index: n, criteria: t(e, n, r)}
        }).sort(function (e, t) {
            var n = e.criteria, r = t.criteria;
            if (n !== r) {
                if (n > r || n === void 0)return 1;
                if (r > n || r === void 0)return -1
            }
            return e.index - t.index
        }), "value")
    };
    var m = function (e) {
        return function (t, n, r) {
            var i = {};
            return n = p.iteratee(n, r), p.each(t, function (r, s) {
                var o = n(r, s, t);
                e(i, r, o)
            }), i
        }
    };
    p.groupBy = m(function (e, t, n) {
        p.has(e, n) ? e[n].push(t) : e[n] = [t]
    }), p.indexBy = m(function (e, t, n) {
        e[n] = t
    }), p.countBy = m(function (e, t, n) {
        p.has(e, n) ? e[n]++ : e[n] = 1
    }), p.sortedIndex = function (e, t, n, r) {
        n = p.iteratee(n, r, 1);
        for (var i = n(t), s = 0, o = e.length; o > s;) {
            var u = s + o >>> 1;
            n(e[u]) < i ? s = u + 1 : o = u
        }
        return s
    }, p.toArray = function (e) {
        return e ? p.isArray(e) ? o.call(e) : e.length === +e.length ? p.map(e, p.identity) : p.values(e) : []
    }, p.size = function (e) {
        return null == e ? 0 : e.length === +e.length ? e.length : p.keys(e).length
    }, p.partition = function (e, t, n) {
        t = p.iteratee(t, n);
        var r = [], i = [];
        return p.each(e, function (e, n, s) {
            (t(e, n, s) ? r : i).push(e)
        }), [r, i]
    }, p.first = p.head = p.take = function (e, t, n) {
        return null == e ? void 0 : null == t || n ? e[0] : 0 > t ? [] : o.call(e, 0, t)
    }, p.initial = function (e, t, n) {
        return o.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
    }, p.last = function (e, t, n) {
        return null == e ? void 0 : null == t || n ? e[e.length - 1] : o.call(e, Math.max(e.length - t, 0))
    }, p.rest = p.tail = p.drop = function (e, t, n) {
        return o.call(e, null == t || n ? 1 : t)
    }, p.compact = function (e) {
        return p.filter(e, p.identity)
    };
    var g = function (e, t, n, r) {
        if (t && p.every(e, p.isArray))return u.apply(r, e);
        for (var i = 0, o = e.length; o > i; i++) {
            var a = e[i];
            p.isArray(a) || p.isArguments(a) ? t ? s.apply(r, a) : g(a, t, n, r) : n || r.push(a)
        }
        return r
    };
    p.flatten = function (e, t) {
        return g(e, t, !1, [])
    }, p.without = function (e) {
        return p.difference(e, o.call(arguments, 1))
    }, p.uniq = p.unique = function (e, t, n, r) {
        if (null == e)return [];
        p.isBoolean(t) || (r = n, n = t, t = !1), null != n && (n = p.iteratee(n, r));
        for (var i = [], s = [], o = 0, u = e.length; u > o; o++) {
            var a = e[o];
            if (t)o && s === a || i.push(a), s = a; else if (n) {
                var f = n(a, o, e);
                p.indexOf(s, f) < 0 && (s.push(f), i.push(a))
            } else p.indexOf(i, a) < 0 && i.push(a)
        }
        return i
    }, p.union = function () {
        return p.uniq(g(arguments, !0, !0, []))
    }, p.intersection = function (e) {
        if (null == e)return [];
        for (var t = [], n = arguments.length, r = 0, i = e.length; i > r; r++) {
            var s = e[r];
            if (!p.contains(t, s)) {
                for (var o = 1; n > o && p.contains(arguments[o], s); o++);
                o === n && t.push(s)
            }
        }
        return t
    }, p.difference = function (e) {
        var t = g(o.call(arguments, 1), !0, !0, []);
        return p.filter(e, function (e) {
            return !p.contains(t, e)
        })
    }, p.zip = function (e) {
        if (null == e)return [];
        for (var t = p.max(arguments, "length").length, n = Array(t), r = 0; t > r; r++)n[r] = p.pluck(arguments, r);
        return n
    }, p.object = function (e, t) {
        if (null == e)return {};
        for (var n = {}, r = 0, i = e.length; i > r; r++)t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }, p.indexOf = function (e, t, n) {
        if (null == e)return -1;
        var r = 0, i = e.length;
        if (n) {
            if ("number" != typeof n)return r = p.sortedIndex(e, t), e[r] === t ? r : -1;
            r = 0 > n ? Math.max(0, i + n) : n
        }
        for (; i > r; r++)if (e[r] === t)return r;
        return -1
    }, p.lastIndexOf = function (e, t, n) {
        if (null == e)return -1;
        var r = e.length;
        for ("number" == typeof n && (r = 0 > n ? r + n + 1 : Math.min(r, n + 1)); --r >= 0;)if (e[r] === t)return r;
        return -1
    }, p.range = function (e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = n || 1;
        for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), s = 0; r > s; s++, e += n)i[s] = e;
        return i
    };
    var y = function () {
    };
    p.bind = function (e, t) {
        var n, r;
        if (h && e.bind === h)return h.apply(e, o.call(arguments, 1));
        if (!p.isFunction(e))throw new TypeError("Bind must be called on a function");
        return n = o.call(arguments, 2), r = function () {
            if (this instanceof r) {
                y.prototype = e.prototype;
                var i = new y;
                y.prototype = null;
                var s = e.apply(i, n.concat(o.call(arguments)));
                return p.isObject(s) ? s : i
            }
            return e.apply(t, n.concat(o.call(arguments)))
        }
    }, p.partial = function (e) {
        var t = o.call(arguments, 1);
        return function () {
            for (var n = 0, r = t.slice(), i = 0, s = r.length; s > i; i++)r[i] === p && (r[i] = arguments[n++]);
            for (; n < arguments.length;)r.push(arguments[n++]);
            return e.apply(this, r)
        }
    }, p.bindAll = function (e) {
        var t, n, r = arguments.length;
        if (1 >= r)throw new Error("bindAll must be passed function names");
        for (t = 1; r > t; t++)n = arguments[t], e[n] = p.bind(e[n], e);
        return e
    }, p.memoize = function (e, t) {
        var n = function (r) {
            var i = n.cache, s = t ? t.apply(this, arguments) : r;
            return p.has(i, s) || (i[s] = e.apply(this, arguments)), i[s]
        };
        return n.cache = {}, n
    }, p.delay = function (e, t) {
        var n = o.call(arguments, 2);
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }, p.defer = function (e) {
        return p.delay.apply(p, [e, 1].concat(o.call(arguments, 1)))
    }, p.throttle = function (e, t, n) {
        var r, i, s, o = null, u = 0;
        n || (n = {});
        var a = function () {
            u = n.leading === !1 ? 0 : p.now(), o = null, s = e.apply(r, i), o || (r = i = null)
        };
        return function () {
            var f = p.now();
            u || n.leading !== !1 || (u = f);
            var l = t - (f - u);
            return r = this, i = arguments, 0 >= l || l > t ? (clearTimeout(o), o = null, u = f, s = e.apply(r, i), o || (r = i = null)) : o || n.trailing === !1 || (o = setTimeout(a, l)), s
        }
    }, p.debounce = function (e, t, n) {
        var r, i, s, o, u, a = function () {
            var f = p.now() - o;
            t > f && f > 0 ? r = setTimeout(a, t - f) : (r = null, n || (u = e.apply(s, i), r || (s = i = null)))
        };
        return function () {
            s = this, i = arguments, o = p.now();
            var f = n && !r;
            return r || (r = setTimeout(a, t)), f && (u = e.apply(s, i), s = i = null), u
        }
    }, p.wrap = function (e, t) {
        return p.partial(t, e)
    }, p.negate = function (e) {
        return function () {
            return !e.apply(this, arguments)
        }
    }, p.compose = function () {
        var e = arguments, t = e.length - 1;
        return function () {
            for (var n = t, r = e[t].apply(this, arguments); n--;)r = e[n].call(this, r);
            return r
        }
    }, p.after = function (e, t) {
        return function () {
            return --e < 1 ? t.apply(this, arguments) : void 0
        }
    }, p.before = function (e, t) {
        var n;
        return function () {
            return --e > 0 ? n = t.apply(this, arguments) : t = null, n
        }
    }, p.once = p.partial(p.before, 2), p.keys = function (e) {
        if (!p.isObject(e))return [];
        if (c)return c(e);
        var t = [];
        for (var n in e)p.has(e, n) && t.push(n);
        return t
    }, p.values = function (e) {
        for (var t = p.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++)r[i] = e[t[i]];
        return r
    }, p.pairs = function (e) {
        for (var t = p.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++)r[i] = [t[i], e[t[i]]];
        return r
    }, p.invert = function (e) {
        for (var t = {}, n = p.keys(e), r = 0, i = n.length; i > r; r++)t[e[n[r]]] = n[r];
        return t
    }, p.functions = p.methods = function (e) {
        var t = [];
        for (var n in e)p.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, p.extend = function (e) {
        if (!p.isObject(e))return e;
        for (var t, n, r = 1, i = arguments.length; i > r; r++) {
            t = arguments[r];
            for (n in t)f.call(t, n) && (e[n] = t[n])
        }
        return e
    }, p.pick = function (e, t, n) {
        var r, i = {};
        if (null == e)return i;
        if (p.isFunction(t)) {
            t = d(t, n);
            for (r in e) {
                var s = e[r];
                t(s, r, e) && (i[r] = s)
            }
        } else {
            var a = u.apply([], o.call(arguments, 1));
            e = new Object(e);
            for (var f = 0, l = a.length; l > f; f++)r = a[f], r in e && (i[r] = e[r])
        }
        return i
    }, p.omit = function (e, t, n) {
        if (p.isFunction(t))t = p.negate(t); else {
            var r = p.map(u.apply([], o.call(arguments, 1)), String);
            t = function (e, t) {
                return !p.contains(r, t)
            }
        }
        return p.pick(e, t, n)
    }, p.defaults = function (e) {
        if (!p.isObject(e))return e;
        for (var t = 1, n = arguments.length; n > t; t++) {
            var r = arguments[t];
            for (var i in r)e[i] === void 0 && (e[i] = r[i])
        }
        return e
    }, p.clone = function (e) {
        return p.isObject(e) ? p.isArray(e) ? e.slice() : p.extend({}, e) : e
    }, p.tap = function (e, t) {
        return t(e), e
    };
    var b = function (e, t, n, r) {
        if (e === t)return 0 !== e || 1 / e === 1 / t;
        if (null == e || null == t)return e === t;
        e instanceof p && (e = e._wrapped), t instanceof p && (t = t._wrapped);
        var i = a.call(e);
        if (i !== a.call(t))return !1;
        switch (i) {
            case"[object RegExp]":
            case"[object String]":
                return "" + e == "" + t;
            case"[object Number]":
                return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
            case"[object Date]":
            case"[object Boolean]":
                return +e === +t
        }
        if ("object" != typeof e || "object" != typeof t)return !1;
        for (var s = n.length; s--;)if (n[s] === e)return r[s] === t;
        var o = e.constructor, u = t.constructor;
        if (o !== u && "constructor"in e && "constructor"in t && !(p.isFunction(o) && o instanceof o && p.isFunction(u) && u instanceof u))return !1;
        n.push(e), r.push(t);
        var f, l;
        if ("[object Array]" === i) {
            if (f = e.length, l = f === t.length)for (; f-- && (l = b(e[f], t[f], n, r)););
        } else {
            var c, h = p.keys(e);
            if (f = h.length, l = p.keys(t).length === f)for (; f-- && (c = h[f], l = p.has(t, c) && b(e[c], t[c], n, r)););
        }
        return n.pop(), r.pop(), l
    };
    p.isEqual = function (e, t) {
        return b(e, t, [], [])
    }, p.isEmpty = function (e) {
        if (null == e)return !0;
        if (p.isArray(e) || p.isString(e) || p.isArguments(e))return 0 === e.length;
        for (var t in e)if (p.has(e, t))return !1;
        return !0
    }, p.isElement = function (e) {
        return !!e && 1 === e.nodeType
    }, p.isArray = l || function (e) {
            return "[object Array]" === a.call(e)
        }, p.isObject = function (e) {
        var t = typeof e;
        return "function" === t || "object" === t && !!e
    }, p.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
        p["is" + e] = function (t) {
            return a.call(t) === "[object " + e + "]"
        }
    }), p.isArguments(arguments) || (p.isArguments = function (e) {
        return p.has(e, "callee")
    }), "function" != typeof /./ && (p.isFunction = function (e) {
        return "function" == typeof e || !1
    }), p.isFinite = function (e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }, p.isNaN = function (e) {
        return p.isNumber(e) && e !== +e
    }, p.isBoolean = function (e) {
        return e === !0 || e === !1 || "[object Boolean]" === a.call(e)
    }, p.isNull = function (e) {
        return null === e
    }, p.isUndefined = function (e) {
        return e === void 0
    }, p.has = function (e, t) {
        return null != e && f.call(e, t)
    }, p.noConflict = function () {
        return e._ = t, this
    }, p.identity = function (e) {
        return e
    }, p.constant = function (e) {
        return function () {
            return e
        }
    }, p.noop = function () {
    }, p.property = function (e) {
        return function (t) {
            return t[e]
        }
    }, p.matches = function (e) {
        var t = p.pairs(e), n = t.length;
        return function (e) {
            if (null == e)return !n;
            e = new Object(e);
            for (var r = 0; n > r; r++) {
                var i = t[r], s = i[0];
                if (i[1] !== e[s] || !(s in e))return !1
            }
            return !0
        }
    }, p.times = function (e, t, n) {
        var r = Array(Math.max(0, e));
        t = d(t, n, 1);
        for (var i = 0; e > i; i++)r[i] = t(i);
        return r
    }, p.random = function (e, t) {
        return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    }, p.now = Date.now || function () {
            return (new Date).getTime()
        };
    var w = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, E = p.invert(w), S = function (e) {
        var t = function (t) {
            return e[t]
        }, n = "(?:" + p.keys(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
        return function (e) {
            return e = null == e ? "" : "" + e, r.test(e) ? e.replace(i, t) : e
        }
    };
    p.escape = S(w), p.unescape = S(E), p.result = function (e, t) {
        if (null == e)return void 0;
        var n = e[t];
        return p.isFunction(n) ? e[t]() : n
    };
    var x = 0;
    p.uniqueId = function (e) {
        var t = ++x + "";
        return e ? e + t : t
    }, p.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var T = /(.)^/, N = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, C = /\\|'|\r|\n|\u2028|\u2029/g, k = function (e) {
        return "\\" + N[e]
    };
    p.template = function (e, t, n) {
        !t && n && (t = n), t = p.defaults({}, t, p.templateSettings);
        var r = RegExp([(t.escape || T).source, (t.interpolate || T).source, (t.evaluate || T).source].join("|") + "|$", "g"), i = 0, s = "__p+='";
        e.replace(r, function (t, n, r, o, u) {
            return s += e.slice(i, u).replace(C, k), i = u + t.length, n ? s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? s += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), t
        }), s += "';\n", t.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", s)
        } catch (u) {
            throw u.source = s, u
        }
        var a = function (e) {
            return o.call(this, e, p)
        }, f = t.variable || "obj";
        return a.source = "function(" + f + "){\n" + s + "}", a
    }, p.chain = function (e) {
        var t = p(e);
        return t._chain = !0, t
    };
    var L = function (e) {
        return this._chain ? p(e).chain() : e
    };
    p.mixin = function (e) {
        p.each(p.functions(e), function (t) {
            var n = p[t] = e[t];
            p.prototype[t] = function () {
                var e = [this._wrapped];
                return s.apply(e, arguments), L.call(this, n.apply(p, e))
            }
        })
    }, p.mixin(p), p.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = n[e];
        p.prototype[e] = function () {
            var n = this._wrapped;
            return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], L.call(this, n)
        }
    }), p.each(["concat", "join", "slice"], function (e) {
        var t = n[e];
        p.prototype[e] = function () {
            return L.call(this, t.apply(this._wrapped, arguments))
        }
    }), p.prototype.value = function () {
        return this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function () {
        return p
    })
}.call(this), !function (e, t) {
    function n(e, t) {
        var n, r, i = e.toLowerCase();
        for (t = [].concat(t), n = 0; n < t.length; n += 1)if (r = t[n]) {
            if (r.test && r.test(e))return !0;
            if (r.toLowerCase() === i)return !0
        }
    }

    var r = t.prototype.trim, i = t.prototype.trimRight, s = t.prototype.trimLeft, o = function (e) {
        return 1 * e || 0
    }, u = function (e, t) {
        if (1 > t)return "";
        for (var n = ""; t > 0;)1 & t && (n += e), t >>= 1, e += e;
        return n
    }, a = [].slice, f = function (e) {
        return null == e ? "\\s" : e.source ? e.source : "[" + d.escapeRegExp(e) + "]"
    }, l = {lt: "<", gt: ">", quot: '"', amp: "&", apos: "'"}, c = {};
    for (var h in l)c[l[h]] = h;
    c["'"] = "#39";
    var p = function () {
        function e(e) {
            return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
        }

        var n = u, r = function () {
            return r.cache.hasOwnProperty(arguments[0]) || (r.cache[arguments[0]] = r.parse(arguments[0])), r.format.call(null, r.cache[arguments[0]], arguments)
        };
        return r.format = function (r, i) {
            var s, o, u, a, f, l, c, h = 1, d = r.length, v = "", m = [];
            for (o = 0; d > o; o++)if (v = e(r[o]), "string" === v)m.push(r[o]); else if ("array" === v) {
                if (a = r[o], a[2])for (s = i[h], u = 0; u < a[2].length; u++) {
                    if (!s.hasOwnProperty(a[2][u]))throw new Error(p('[_.sprintf] property "%s" does not exist', a[2][u]));
                    s = s[a[2][u]]
                } else s = a[1] ? i[a[1]] : i[h++];
                if (/[^s]/.test(a[8]) && "number" != e(s))throw new Error(p("[_.sprintf] expecting number but found %s", e(s)));
                switch (a[8]) {
                    case"b":
                        s = s.toString(2);
                        break;
                    case"c":
                        s = t.fromCharCode(s);
                        break;
                    case"d":
                        s = parseInt(s, 10);
                        break;
                    case"e":
                        s = a[7] ? s.toExponential(a[7]) : s.toExponential();
                        break;
                    case"f":
                        s = a[7] ? parseFloat(s).toFixed(a[7]) : parseFloat(s);
                        break;
                    case"o":
                        s = s.toString(8);
                        break;
                    case"s":
                        s = (s = t(s)) && a[7] ? s.substring(0, a[7]) : s;
                        break;
                    case"u":
                        s = Math.abs(s);
                        break;
                    case"x":
                        s = s.toString(16);
                        break;
                    case"X":
                        s = s.toString(16).toUpperCase()
                }
                s = /[def]/.test(a[8]) && a[3] && s >= 0 ? "+" + s : s, l = a[4] ? "0" == a[4] ? "0" : a[4].charAt(1) : " ", c = a[6] - t(s).length, f = a[6] ? n(l, c) : "", m.push(a[5] ? s + f : f + s)
            }
            return m.join("")
        }, r.cache = {}, r.parse = function (e) {
            for (var t = e, n = [], r = [], i = 0; t;) {
                if (null !== (n = /^[^\x25]+/.exec(t)))r.push(n[0]); else if (null !== (n = /^\x25{2}/.exec(t)))r.push("%"); else {
                    if (null === (n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t)))throw new Error("[_.sprintf] huh?");
                    if (n[2]) {
                        i |= 1;
                        var s = [], o = n[2], u = [];
                        if (null === (u = /^([a-z_][a-z_\d]*)/i.exec(o)))throw new Error("[_.sprintf] huh?");
                        for (s.push(u[1]); "" !== (o = o.substring(u[0].length));)if (null !== (u = /^\.([a-z_][a-z_\d]*)/i.exec(o)))s.push(u[1]); else {
                            if (null === (u = /^\[(\d+)\]/.exec(o)))throw new Error("[_.sprintf] huh?");
                            s.push(u[1])
                        }
                        n[2] = s
                    } else i |= 2;
                    if (3 === i)throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
                    r.push(n)
                }
                t = t.substring(n[0].length)
            }
            return r
        }, r
    }(), d = {
        VERSION: "2.4.0", isBlank: function (e) {
            return null == e && (e = ""), /^\s*$/.test(e)
        }, stripTags: function (e) {
            return null == e ? "" : t(e).replace(/<\/?[^>]+>/g, "")
        }, capitalize: function (e) {
            return e = null == e ? "" : t(e), e.charAt(0).toUpperCase() + e.slice(1)
        }, chop: function (e, n) {
            return null == e ? [] : (e = t(e), n = ~~n, n > 0 ? e.match(new RegExp(".{1," + n + "}", "g")) : [e])
        }, clean: function (e) {
            return d.strip(e).replace(/\s+/g, " ")
        }, count: function (e, n) {
            if (null == e || null == n)return 0;
            e = t(e), n = t(n);
            for (var r = 0, i = 0, s = n.length; ;) {
                if (i = e.indexOf(n, i), -1 === i)break;
                r++, i += s
            }
            return r
        }, chars: function (e) {
            return null == e ? [] : t(e).split("")
        }, swapCase: function (e) {
            return null == e ? "" : t(e).replace(/\S/g, function (e) {
                return e === e.toUpperCase() ? e.toLowerCase() : e.toUpperCase()
            })
        }, escapeHTML: function (e) {
            return null == e ? "" : t(e).replace(/[&<>"']/g, function (e) {
                return "&" + c[e] + ";"
            })
        }, unescapeHTML: function (e) {
            return null == e ? "" : t(e).replace(/\&([^;]+);/g, function (e, n) {
                var r;
                return n in l ? l[n] : (r = n.match(/^#x([\da-fA-F]+)$/)) ? t.fromCharCode(parseInt(r[1], 16)) : (r = n.match(/^#(\d+)$/)) ? t.fromCharCode(~~r[1]) : e
            })
        }, escapeRegExp: function (e) {
            return null == e ? "" : t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        }, splice: function (e, t, n, r) {
            var i = d.chars(e);
            return i.splice(~~t, ~~n, r), i.join("")
        }, insert: function (e, t, n) {
            return d.splice(e, t, 0, n)
        }, include: function (e, n) {
            return "" === n ? !0 : null == e ? !1 : -1 !== t(e).indexOf(n)
        }, join: function () {
            var e = a.call(arguments), t = e.shift();
            return null == t && (t = ""), e.join(t)
        }, lines: function (e) {
            return null == e ? [] : t(e).split("\n")
        }, reverse: function (e) {
            return d.chars(e).reverse().join("")
        }, startsWith: function (e, n) {
            return "" === n ? !0 : null == e || null == n ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(0, n.length) === n)
        }, endsWith: function (e, n) {
            return "" === n ? !0 : null == e || null == n ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(e.length - n.length) === n)
        }, succ: function (e) {
            return null == e ? "" : (e = t(e), e.slice(0, -1) + t.fromCharCode(e.charCodeAt(e.length - 1) + 1))
        }, titleize: function (e) {
            return null == e ? "" : (e = t(e).toLowerCase(), e.replace(/(?:^|\s|-)\S/g, function (e) {
                return e.toUpperCase()
            }))
        }, camelize: function (e) {
            return d.trim(e).replace(/[-_\s]+(.)?/g, function (e, t) {
                return t ? t.toUpperCase() : ""
            })
        }, underscored: function (e) {
            return d.trim(e).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
        }, dasherize: function (e) {
            return d.trim(e).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
        }, classify: function (e) {
            return d.capitalize(d.camelize(t(e).replace(/[\W_]/g, " ")).replace(/\s/g, ""))
        }, humanize: function (e) {
            return d.capitalize(d.underscored(e).replace(/_id$/, "").replace(/_/g, " "))
        }, trim: function (e, n) {
            return null == e ? "" : !n && r ? r.call(e) : (n = f(n), t(e).replace(new RegExp("^" + n + "+|" + n + "+$", "g"), ""))
        }, ltrim: function (e, n) {
            return null == e ? "" : !n && s ? s.call(e) : (n = f(n), t(e).replace(new RegExp("^" + n + "+"), ""))
        }, rtrim: function (e, n) {
            return null == e ? "" : !n && i ? i.call(e) : (n = f(n), t(e).replace(new RegExp(n + "+$"), ""))
        }, truncate: function (e, n, r) {
            return null == e ? "" : (e = t(e), r = r || "...", n = ~~n, e.length > n ? e.slice(0, n) + r : e)
        }, prune: function (e, n, r) {
            if (null == e)return "";
            if (e = t(e), n = ~~n, r = null != r ? t(r) : "...", e.length <= n)return e;
            var i = function (e) {
                return e.toUpperCase() !== e.toLowerCase() ? "A" : " "
            }, s = e.slice(0, n + 1).replace(/.(?=\W*\w*$)/g, i);
            return s = s.slice(s.length - 2).match(/\w\w/) ? s.replace(/\s*\S+$/, "") : d.rtrim(s.slice(0, s.length - 1)), (s + r).length > e.length ? e : e.slice(0, s.length) + r
        }, words: function (e, t) {
            return d.isBlank(e) ? [] : d.trim(e, t).split(t || /\s+/)
        }, pad: function (e, n, r, i) {
            e = null == e ? "" : t(e), n = ~~n;
            var s = 0;
            switch (r ? r.length > 1 && (r = r.charAt(0)) : r = " ", i) {
                case"right":
                    return s = n - e.length, e + u(r, s);
                case"both":
                    return s = n - e.length, u(r, Math.ceil(s / 2)) + e + u(r, Math.floor(s / 2));
                default:
                    return s = n - e.length, u(r, s) + e
            }
        }, lpad: function (e, t, n) {
            return d.pad(e, t, n)
        }, rpad: function (e, t, n) {
            return d.pad(e, t, n, "right")
        }, lrpad: function (e, t, n) {
            return d.pad(e, t, n, "both")
        }, sprintf: p, vsprintf: function (e, t) {
            return t.unshift(e), p.apply(null, t)
        }, toNumber: function (e, t) {
            return e ? (e = d.trim(e), e.match(/^-?\d+(?:\.\d+)?$/) ? o(o(e).toFixed(~~t)) : 0 / 0) : 0
        }, numberFormat: function (e, t, n, r) {
            if (isNaN(e) || null == e)return "";
            e = e.toFixed(~~t), r = "string" == typeof r ? r : ",";
            var i = e.split("."), s = i[0], o = i[1] ? (n || ".") + i[1] : "";
            return s.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + r) + o
        }, strRight: function (e, n) {
            if (null == e)return "";
            e = t(e), n = null != n ? t(n) : n;
            var r = n ? e.indexOf(n) : -1;
            return ~r ? e.slice(r + n.length, e.length) : e
        }, strRightBack: function (e, n) {
            if (null == e)return "";
            e = t(e), n = null != n ? t(n) : n;
            var r = n ? e.lastIndexOf(n) : -1;
            return ~r ? e.slice(r + n.length, e.length) : e
        }, strLeft: function (e, n) {
            if (null == e)return "";
            e = t(e), n = null != n ? t(n) : n;
            var r = n ? e.indexOf(n) : -1;
            return ~r ? e.slice(0, r) : e
        }, strLeftBack: function (e, t) {
            if (null == e)return "";
            e += "", t = null != t ? "" + t : t;
            var n = e.lastIndexOf(t);
            return ~n ? e.slice(0, n) : e
        }, toSentence: function (e, t, n, r) {
            t = t || ", ", n = n || " and ";
            var i = e.slice(), s = i.pop();
            return e.length > 2 && r && (n = d.rtrim(t) + n), i.length ? i.join(t) + n + s : s
        }, toSentenceSerial: function () {
            var e = a.call(arguments);
            return e[3] = !0, d.toSentence.apply(d, e)
        }, slugify: function (e) {
            if (null == e)return "";
            var n = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź", r = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz", i = new RegExp(f(n), "g");
            return e = t(e).toLowerCase().replace(i, function (e) {
                var t = n.indexOf(e);
                return r.charAt(t) || "-"
            }), d.dasherize(e.replace(/[^\w\s-]/g, ""))
        }, surround: function (e, t) {
            return [t, e, t].join("")
        }, quote: function (e, t) {
            return d.surround(e, t || '"')
        }, unquote: function (e, t) {
            return t = t || '"', e[0] === t && e[e.length - 1] === t ? e.slice(1, e.length - 1) : e
        }, exports: function () {
            var e = {};
            for (var t in this)this.hasOwnProperty(t) && !t.match(/^(?:include|contains|reverse)$/) && (e[t] = this[t]);
            return e
        }, repeat: function (e, n, r) {
            if (null == e)return "";
            if (n = ~~n, null == r)return u(t(e), n);
            for (var i = []; n > 0; i[--n] = e);
            return i.join(r)
        }, naturalCmp: function (e, n) {
            if (e == n)return 0;
            if (!e)return -1;
            if (!n)return 1;
            for (var r = /(\.\d+)|(\d+)|(\D+)/g, i = t(e).toLowerCase().match(r), s = t(n).toLowerCase().match(r), o = Math.min(i.length, s.length), u = 0; o > u; u++) {
                var a = i[u], f = s[u];
                if (a !== f) {
                    var l = parseInt(a, 10);
                    if (!isNaN(l)) {
                        var c = parseInt(f, 10);
                        if (!isNaN(c) && l - c)return l - c
                    }
                    return f > a ? -1 : 1
                }
            }
            return i.length === s.length ? i.length - s.length : n > e ? -1 : 1
        }, levenshtein: function (e, n) {
            if (null == e && null == n)return 0;
            if (null == e)return t(n).length;
            if (null == n)return t(e).length;
            e = t(e), n = t(n);
            for (var r, i, s = [], o = 0; o <= n.length; o++)for (var u = 0; u <= e.length; u++)i = o && u ? e.charAt(u - 1) === n.charAt(o - 1) ? r : Math.min(s[u], s[u - 1], r) + 1 : o + u, r = s[u], s[u] = i;
            return s.pop()
        }, toBoolean: function (e, t, r) {
            return "number" == typeof e && (e = "" + e), "string" != typeof e ? !!e : (e = d.trim(e), n(e, t || ["true", "1"]) ? !0 : n(e, r || ["false", "0"]) ? !1 : void 0)
        }
    };
    d.strip = d.trim, d.lstrip = d.ltrim, d.rstrip = d.rtrim, d.center = d.lrpad, d.rjust = d.lpad, d.ljust = d.rpad, d.contains = d.include, d.q = d.quote, d.toBool = d.toBoolean, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (module.exports = d), exports._s = d), "function" == typeof define && define.amd && define("underscore.string", [], function () {
        return d
    }), e._ = e._ || {}, e._.string = e._.str = d
}(this, String), !function (e) {
    function t(e, t) {
        var n = (65535 & e) + (65535 & t), r = (e >> 16) + (t >> 16) + (n >> 16);
        return r << 16 | 65535 & n
    }

    function n(e, t) {
        return e << t | e >>> 32 - t
    }

    function r(e, r, i, s, o, u) {
        return t(n(t(t(r, e), t(s, u)), o), i)
    }

    function i(e, t, n, i, s, o, u) {
        return r(t & n | ~t & i, e, t, s, o, u)
    }

    function s(e, t, n, i, s, o, u) {
        return r(t & i | n & ~i, e, t, s, o, u)
    }

    function o(e, t, n, i, s, o, u) {
        return r(t ^ n ^ i, e, t, s, o, u)
    }

    function u(e, t, n, i, s, o, u) {
        return r(n ^ (t | ~i), e, t, s, o, u)
    }

    function a(e, n) {
        e[n >> 5] |= 128 << n % 32, e[(n + 64 >>> 9 << 4) + 14] = n;
        var r, a, f, l, c, h = 1732584193, p = -271733879, d = -1732584194, v = 271733878;
        for (r = 0; r < e.length; r += 16)a = h, f = p, l = d, c = v, h = i(h, p, d, v, e[r], 7, -680876936), v = i(v, h, p, d, e[r + 1], 12, -389564586), d = i(d, v, h, p, e[r + 2], 17, 606105819), p = i(p, d, v, h, e[r + 3], 22, -1044525330), h = i(h, p, d, v, e[r + 4], 7, -176418897), v = i(v, h, p, d, e[r + 5], 12, 1200080426), d = i(d, v, h, p, e[r + 6], 17, -1473231341), p = i(p, d, v, h, e[r + 7], 22, -45705983), h = i(h, p, d, v, e[r + 8], 7, 1770035416), v = i(v, h, p, d, e[r + 9], 12, -1958414417), d = i(d, v, h, p, e[r + 10], 17, -42063), p = i(p, d, v, h, e[r + 11], 22, -1990404162), h = i(h, p, d, v, e[r + 12], 7, 1804603682), v = i(v, h, p, d, e[r + 13], 12, -40341101), d = i(d, v, h, p, e[r + 14], 17, -1502002290), p = i(p, d, v, h, e[r + 15], 22, 1236535329), h = s(h, p, d, v, e[r + 1], 5, -165796510), v = s(v, h, p, d, e[r + 6], 9, -1069501632), d = s(d, v, h, p, e[r + 11], 14, 643717713), p = s(p, d, v, h, e[r], 20, -373897302), h = s(h, p, d, v, e[r + 5], 5, -701558691), v = s(v, h, p, d, e[r + 10], 9, 38016083), d = s(d, v, h, p, e[r + 15], 14, -660478335), p = s(p, d, v, h, e[r + 4], 20, -405537848), h = s(h, p, d, v, e[r + 9], 5, 568446438), v = s(v, h, p, d, e[r + 14], 9, -1019803690), d = s(d, v, h, p, e[r + 3], 14, -187363961), p = s(p, d, v, h, e[r + 8], 20, 1163531501), h = s(h, p, d, v, e[r + 13], 5, -1444681467), v = s(v, h, p, d, e[r + 2], 9, -51403784), d = s(d, v, h, p, e[r + 7], 14, 1735328473), p = s(p, d, v, h, e[r + 12], 20, -1926607734), h = o(h, p, d, v, e[r + 5], 4, -378558), v = o(v, h, p, d, e[r + 8], 11, -2022574463), d = o(d, v, h, p, e[r + 11], 16, 1839030562), p = o(p, d, v, h, e[r + 14], 23, -35309556), h = o(h, p, d, v, e[r + 1], 4, -1530992060), v = o(v, h, p, d, e[r + 4], 11, 1272893353), d = o(d, v, h, p, e[r + 7], 16, -155497632), p = o(p, d, v, h, e[r + 10], 23, -1094730640), h = o(h, p, d, v, e[r + 13], 4, 681279174), v = o(v, h, p, d, e[r], 11, -358537222), d = o(d, v, h, p, e[r + 3], 16, -722521979), p = o(p, d, v, h, e[r + 6], 23, 76029189), h = o(h, p, d, v, e[r + 9], 4, -640364487), v = o(v, h, p, d, e[r + 12], 11, -421815835), d = o(d, v, h, p, e[r + 15], 16, 530742520), p = o(p, d, v, h, e[r + 2], 23, -995338651), h = u(h, p, d, v, e[r], 6, -198630844), v = u(v, h, p, d, e[r + 7], 10, 1126891415), d = u(d, v, h, p, e[r + 14], 15, -1416354905), p = u(p, d, v, h, e[r + 5], 21, -57434055), h = u(h, p, d, v, e[r + 12], 6, 1700485571), v = u(v, h, p, d, e[r + 3], 10, -1894986606), d = u(d, v, h, p, e[r + 10], 15, -1051523), p = u(p, d, v, h, e[r + 1], 21, -2054922799), h = u(h, p, d, v, e[r + 8], 6, 1873313359), v = u(v, h, p, d, e[r + 15], 10, -30611744), d = u(d, v, h, p, e[r + 6], 15, -1560198380), p = u(p, d, v, h, e[r + 13], 21, 1309151649), h = u(h, p, d, v, e[r + 4], 6, -145523070), v = u(v, h, p, d, e[r + 11], 10, -1120210379), d = u(d, v, h, p, e[r + 2], 15, 718787259), p = u(p, d, v, h, e[r + 9], 21, -343485551), h = t(h, a), p = t(p, f), d = t(d, l), v = t(v, c);
        return [h, p, d, v]
    }

    function f(e) {
        var t, n = "";
        for (t = 0; t < 32 * e.length; t += 8)n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n
    }

    function l(e) {
        var t, n = [];
        for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1)n[t] = 0;
        for (t = 0; t < 8 * e.length; t += 8)n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return n
    }

    function c(e) {
        return f(a(l(e), 8 * e.length))
    }

    function h(e, t) {
        var n, r, i = l(e), s = [], o = [];
        for (s[15] = o[15] = void 0, i.length > 16 && (i = a(i, 8 * e.length)), n = 0; 16 > n; n += 1)s[n] = 909522486 ^ i[n], o[n] = 1549556828 ^ i[n];
        return r = a(s.concat(l(t)), 512 + 8 * t.length), f(a(o.concat(r), 640))
    }

    function p(e) {
        var t, n, r = "0123456789abcdef", i = "";
        for (n = 0; n < e.length; n += 1)t = e.charCodeAt(n), i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
        return i
    }

    function d(e) {
        return unescape(encodeURIComponent(e))
    }

    function v(e) {
        return c(d(e))
    }

    function m(e) {
        return p(v(e))
    }

    function g(e, t) {
        return h(d(e), d(t))
    }

    function y(e, t) {
        return p(g(e, t))
    }

    function b(e, t, n) {
        return t ? n ? g(t, e) : y(t, e) : n ? v(e) : m(e)
    }

    "function" == typeof define && define.amd ? define("md5", [], function () {
        return b
    }) : e.md5 = b
}(this), function (e) {
    function o() {
        try {
            return r in e && e[r]
        } catch (t) {
            return !1
        }
    }

    var t = {}, n = e.document, r = "localStorage", i = "script", s;
    t.disabled = !1, t.version = "1.3.17", t.set = function (e, t) {
    }, t.get = function (e, t) {
    }, t.has = function (e) {
        return t.get(e) !== undefined
    }, t.remove = function (e) {
    }, t.clear = function () {
    }, t.transact = function (e, n, r) {
        r == null && (r = n, n = null), n == null && (n = {});
        var i = t.get(e, n);
        r(i), t.set(e, i)
    }, t.getAll = function () {
    }, t.forEach = function () {
    }, t.serialize = function (e) {
        return JSON.stringify(e)
    }, t.deserialize = function (e) {
        if (typeof e != "string")return undefined;
        try {
            return JSON.parse(e)
        } catch (t) {
            return e || undefined
        }
    };
    if (o())s = e[r], t.set = function (e, n) {
        return n === undefined ? t.remove(e) : (s.setItem(e, t.serialize(n)), n)
    }, t.get = function (e, n) {
        var r = t.deserialize(s.getItem(e));
        return r === undefined ? n : r
    }, t.remove = function (e) {
        s.removeItem(e)
    }, t.clear = function () {
        s.clear()
    }, t.getAll = function () {
        var e = {};
        return t.forEach(function (t, n) {
            e[t] = n
        }), e
    }, t.forEach = function (e) {
        for (var n = 0; n < s.length; n++) {
            var r = s.key(n);
            e(r, t.get(r))
        }
    }; else if (n.documentElement.addBehavior) {
        var u, a;
        try {
            a = new ActiveXObject("htmlfile"), a.open(), a.write("<" + i + ">document.w=window</" + i + '><iframe src="/favicon.ico"></iframe>'), a.close(), u = a.w.frames[0].document, s = u.createElement("div")
        } catch (f) {
            s = n.createElement("div"), u = n.body
        }
        var l = function (e) {
            return function () {
                var n = Array.prototype.slice.call(arguments, 0);
                n.unshift(s), u.appendChild(s), s.addBehavior("#default#userData"), s.load(r);
                var i = e.apply(t, n);
                return u.removeChild(s), i
            }
        }, c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");

        function h(e) {
            return e.replace(/^d/, "___$&").replace(c, "___")
        }

        t.set = l(function (e, n, i) {
            return n = h(n), i === undefined ? t.remove(n) : (e.setAttribute(n, t.serialize(i)), e.save(r), i)
        }), t.get = l(function (e, n, r) {
            n = h(n);
            var i = t.deserialize(e.getAttribute(n));
            return i === undefined ? r : i
        }), t.remove = l(function (e, t) {
            t = h(t), e.removeAttribute(t), e.save(r)
        }), t.clear = l(function (e) {
            var t = e.XMLDocument.documentElement.attributes;
            e.load(r);
            for (var n = 0, i; i = t[n]; n++)e.removeAttribute(i.name);
            e.save(r)
        }), t.getAll = function (e) {
            var n = {};
            return t.forEach(function (e, t) {
                n[e] = t
            }), n
        }, t.forEach = l(function (e, n) {
            var r = e.XMLDocument.documentElement.attributes;
            for (var i = 0, s; s = r[i]; ++i)n(s.name, t.deserialize(e.getAttribute(s.name)))
        })
    }
    try {
        var p = "__storejs__";
        t.set(p, p), t.get(p) != p && (t.disabled = !0), t.remove(p)
    } catch (f) {
        t.disabled = !0
    }
    t.enabled = !t.disabled, typeof module != "undefined" && module.exports && this.module !== module ? module.exports = t : typeof define == "function" && define.amd ? define("store", t) : e.store = t
}(Function("return this")()), define("text", ["module"], function (e) {
    var t, n, r, i, s, o = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], u = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, a = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, f = typeof location != "undefined" && location.href, l = f && location.protocol && location.protocol.replace(/\:/, ""), c = f && location.hostname, h = f && (location.port || undefined), p = {}, d = e.config && e.config() || {};
    t = {
        version: "2.0.14", strip: function (e) {
            if (e) {
                e = e.replace(u, "");
                var t = e.match(a);
                t && (e = t[1])
            } else e = "";
            return e
        }, jsEscape: function (e) {
            return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
        }, createXhr: d.createXhr || function () {
            var e, t, n;
            if (typeof XMLHttpRequest != "undefined")return new XMLHttpRequest;
            if (typeof ActiveXObject != "undefined")for (t = 0; t < 3; t += 1) {
                n = o[t];
                try {
                    e = new ActiveXObject(n)
                } catch (r) {
                }
                if (e) {
                    o = [n];
                    break
                }
            }
            return e
        }, parseName: function (e) {
            var t, n, r, i = !1, s = e.lastIndexOf("."), o = e.indexOf("./") === 0 || e.indexOf("../") === 0;
            return s !== -1 && (!o || s > 1) ? (t = e.substring(0, s), n = e.substring(s + 1)) : t = e, r = n || t, s = r.indexOf("!"), s !== -1 && (i = r.substring(s + 1) === "strip", r = r.substring(0, s), n ? n = r : t = r), {
                moduleName: t,
                ext: n,
                strip: i
            }
        }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (e, n, r, i) {
            var s, o, u, a = t.xdRegExp.exec(e);
            return a ? (s = a[2], o = a[3], o = o.split(":"), u = o[1], o = o[0], (!s || s === n) && (!o || o.toLowerCase() === r.toLowerCase()) && (!u && !o || u === i)) : !0
        }, finishLoad: function (e, n, r, i) {
            r = n ? t.strip(r) : r, d.isBuild && (p[e] = r), i(r)
        }, load: function (e, n, r, i) {
            if (i && i.isBuild && !i.inlineText) {
                r();
                return
            }
            d.isBuild = i && i.isBuild;
            var s = t.parseName(e), o = s.moduleName + (s.ext ? "." + s.ext : ""), u = n.toUrl(o), a = d.useXhr || t.useXhr;
            if (u.indexOf("empty:") === 0) {
                r();
                return
            }
            !f || a(u, l, c, h) ? t.get(u, function (n) {
                t.finishLoad(e, s.strip, n, r)
            }, function (e) {
                r.error && r.error(e)
            }) : n([o], function (e) {
                t.finishLoad(s.moduleName + "." + s.ext, s.strip, e, r)
            })
        }, write: function (e, n, r, i) {
            if (p.hasOwnProperty(n)) {
                var s = t.jsEscape(p[n]);
                r.asModule(e + "!" + n, "define(function () { return '" + s + "';});\n")
            }
        }, writeFile: function (e, n, r, i, s) {
            var o = t.parseName(n), u = o.ext ? "." + o.ext : "", a = o.moduleName + u, f = r.toUrl(o.moduleName + u) + ".js";
            t.load(a, r, function (n) {
                var r = function (e) {
                    return i(f, e)
                };
                r.asModule = function (e, t) {
                    return i.asModule(e, f, t)
                }, t.write(e, a, r, s)
            }, s)
        }
    };
    if (d.env === "node" || !d.env && typeof process != "undefined" && process.versions && !!process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"])n = require.nodeRequire("fs"), t.get = function (e, t, r) {
        try {
            var i = n.readFileSync(e, "utf8");
            i[0] === "﻿" && (i = i.substring(1)), t(i)
        } catch (s) {
            r && r(s)
        }
    }; else if (d.env === "xhr" || !d.env && t.createXhr())t.get = function (e, n, r, i) {
        var s = t.createXhr(), o;
        s.open("GET", e, !0);
        if (i)for (o in i)i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
        d.onXhr && d.onXhr(s, e), s.onreadystatechange = function (t) {
            var i, o;
            s.readyState === 4 && (i = s.status || 0, i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i), o.xhr = s, r && r(o)) : n(s.responseText), d.onXhrComplete && d.onXhrComplete(s, e))
        }, s.send(null)
    }; else if (d.env === "rhino" || !d.env && typeof Packages != "undefined" && typeof java != "undefined")t.get = function (e, t) {
        var n, r, i = "utf-8", s = new java.io.File(e), o = java.lang.System.getProperty("line.separator"), u = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), i)), a = "";
        try {
            n = new java.lang.StringBuffer, r = u.readLine(), r && r.length() && r.charAt(0) === 65279 && (r = r.substring(1)), r !== null && n.append(r);
            while ((r = u.readLine()) !== null)n.append(o), n.append(r);
            a = String(n.toString())
        } finally {
            u.close()
        }
        t(a)
    }; else if (d.env === "xpconnect" || !d.env && typeof Components != "undefined" && Components.classes && Components.interfaces)r = Components.classes, i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), s = "@mozilla.org/windows-registry-key;1"in r, t.get = function (e, t) {
        var n, o, u, a = {};
        s && (e = e.replace(/\//g, "\\")), u = new FileUtils.File(e);
        try {
            n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), n.init(u, 1, 0, !1), o = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), o.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), o.readString(n.available(), a), o.close(), n.close(), t(a.value)
        } catch (f) {
            throw new Error((u && u.path || "") + ": " + f)
        }
    };
    return t
}), function (e) {
    function tt(e, t, n) {
        switch (arguments.length) {
            case 2:
                return e != null ? e : t;
            case 3:
                return e != null ? e : t != null ? t : n;
            default:
                throw new Error("Implement me")
        }
    }

    function nt(e, t) {
        return o.call(e, t)
    }

    function rt() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function it(e) {
        t.suppressDeprecationWarnings === !1 && typeof console != "undefined" && console.warn && console.warn("Deprecation warning: " + e)
    }

    function st(e, t) {
        var n = !0;
        return ht(function () {
            return n && (it(e), n = !1), t.apply(this, arguments)
        }, t)
    }

    function ot(e, t) {
        Z[e] || (it(t), Z[e] = !0)
    }

    function ut(e, t) {
        return function (n) {
            return vt(e.call(this, n), t)
        }
    }

    function at(e, t) {
        return function (n) {
            return this.localeData().ordinal(e.call(this, n), t)
        }
    }

    function ft() {
    }

    function lt(e, t) {
        t !== !1 && Mt(e), pt(this, e), this._d = new Date(+e._d)
    }

    function ct(e) {
        var n = Tt(e), r = n.year || 0, i = n.quarter || 0, s = n.month || 0, o = n.week || 0, u = n.day || 0, a = n.hour || 0, f = n.minute || 0, l = n.second || 0, c = n.millisecond || 0;
        this._milliseconds = +c + l * 1e3 + f * 6e4 + a * 36e5, this._days = +u + o * 7, this._months = +s + i * 3 + r * 12, this._data = {}, this._locale = t.localeData(), this._bubble()
    }

    function ht(e, t) {
        for (var n in t)nt(t, n) && (e[n] = t[n]);
        return nt(t, "toString") && (e.toString = t.toString), nt(t, "valueOf") && (e.valueOf = t.valueOf), e
    }

    function pt(e, t) {
        var n, r, i;
        typeof t._isAMomentObject != "undefined" && (e._isAMomentObject = t._isAMomentObject), typeof t._i != "undefined" && (e._i = t._i), typeof t._f != "undefined" && (e._f = t._f), typeof t._l != "undefined" && (e._l = t._l), typeof t._strict != "undefined" && (e._strict = t._strict), typeof t._tzm != "undefined" && (e._tzm = t._tzm), typeof t._isUTC != "undefined" && (e._isUTC = t._isUTC), typeof t._offset != "undefined" && (e._offset = t._offset), typeof t._pf != "undefined" && (e._pf = t._pf), typeof t._locale != "undefined" && (e._locale = t._locale);
        if (m.length > 0)for (n in m)r = m[n], i = t[r], typeof i != "undefined" && (e[r] = i);
        return e
    }

    function dt(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e)
    }

    function vt(e, t, n) {
        var r = "" + Math.abs(e), i = e >= 0;
        while (r.length < t)r = "0" + r;
        return (i ? n ? "+" : "" : "-") + r
    }

    function mt(e, t) {
        var n = {milliseconds: 0, months: 0};
        return n.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
    }

    function gt(e, t) {
        var n;
        return t = Bt(t, e), e.isBefore(t) ? n = mt(e, t) : (n = mt(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n
    }

    function yt(e, n) {
        return function (r, i) {
            var s, o;
            return i !== null && !isNaN(+i) && (ot(n, "moment()." + n + "(period, number) is deprecated. Please use moment()." + n + "(number, period)."), o = r, r = i, i = o), r = typeof r == "string" ? +r : r, s = t.duration(r, i), bt(this, s, e), this
        }
    }

    function bt(e, n, r, i) {
        var s = n._milliseconds, o = n._days, u = n._months;
        i = i == null ? !0 : i, s && e._d.setTime(+e._d + s * r), o && dn(e, "Date", pn(e, "Date") + o * r), u && hn(e, pn(e, "Month") + u * r), i && t.updateOffset(e, o || u)
    }

    function wt(e) {
        return Object.prototype.toString.call(e) === "[object Array]"
    }

    function Et(e) {
        return Object.prototype.toString.call(e) === "[object Date]" || e instanceof Date
    }

    function St(e, t, n) {
        var r = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), s = 0, o;
        for (o = 0; o < r; o++)(n && e[o] !== t[o] || !n && Ct(e[o]) !== Ct(t[o])) && s++;
        return s + i
    }

    function xt(e) {
        if (e) {
            var t = e.toLowerCase().replace(/(.)s$/, "$1");
            e = V[e] || $[t] || t
        }
        return e
    }

    function Tt(e) {
        var t = {}, n, r;
        for (r in e)nt(e, r) && (n = xt(r), n && (t[n] = e[r]));
        return t
    }

    function Nt(n) {
        var r, i;
        if (n.indexOf("week") === 0)r = 7, i = "day"; else {
            if (n.indexOf("month") !== 0)return;
            r = 12, i = "month"
        }
        t[n] = function (s, o) {
            var u, a, f = t._locale[n], l = [];
            typeof s == "number" && (o = s, s = e), a = function (e) {
                var n = t().utc().set(i, e);
                return f.call(t._locale, n, s || "")
            };
            if (o != null)return a(o);
            for (u = 0; u < r; u++)l.push(a(u));
            return l
        }
    }

    function Ct(e) {
        var t = +e, n = 0;
        return t !== 0 && isFinite(t) && (t >= 0 ? n = Math.floor(t) : n = Math.ceil(t)), n
    }

    function kt(e, t) {
        return (new Date(Date.UTC(e, t + 1, 0))).getUTCDate()
    }

    function Lt(e, n, r) {
        return an(t([e, 11, 31 + n - r]), n, r).week
    }

    function At(e) {
        return Ot(e) ? 366 : 365
    }

    function Ot(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
    }

    function Mt(e) {
        var t;
        e._a && e._pf.overflow === -2 && (t = e._a[f] < 0 || e._a[f] > 11 ? f : e._a[l] < 1 || e._a[l] > kt(e._a[a], e._a[f]) ? l : e._a[c] < 0 || e._a[c] > 24 || e._a[c] === 24 && (e._a[h] !== 0 || e._a[p] !== 0 || e._a[d] !== 0) ? c : e._a[h] < 0 || e._a[h] > 59 ? h : e._a[p] < 0 || e._a[p] > 59 ? p : e._a[d] < 0 || e._a[d] > 999 ? d : -1, e._pf._overflowDayOfYear && (t < a || t > l) && (t = l), e._pf.overflow = t)
    }

    function _t(t) {
        return t._isValid == null && (t._isValid = !isNaN(t._d.getTime()) && t._pf.overflow < 0 && !t._pf.empty && !t._pf.invalidMonth && !t._pf.nullInput && !t._pf.invalidFormat && !t._pf.userInvalidated, t._strict && (t._isValid = t._isValid && t._pf.charsLeftOver === 0 && t._pf.unusedTokens.length === 0 && t._pf.bigHour === e)), t._isValid
    }

    function Dt(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }

    function Pt(e) {
        var t = 0, n, r, i, s;
        while (t < e.length) {
            s = Dt(e[t]).split("-"), n = s.length, r = Dt(e[t + 1]), r = r ? r.split("-") : null;
            while (n > 0) {
                i = Ht(s.slice(0, n).join("-"));
                if (i)return i;
                if (r && r.length >= n && St(s, r, !0) >= n - 1)break;
                n--
            }
            t++
        }
        return null
    }

    function Ht(e) {
        var n = null;
        if (!v[e] && g)try {
            n = t.locale(), require("./locale/" + e), t.locale(n)
        } catch (r) {
        }
        return v[e]
    }

    function Bt(e, n) {
        var r, i;
        return n._isUTC ? (r = n.clone(), i = (t.isMoment(e) || Et(e) ? +e : +t(e)) - +r, r._d.setTime(+r._d + i), t.updateOffset(r, !1), r) : t(e).local()
    }

    function jt(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function Ft(e) {
        var t = e.match(E), n, r;
        for (n = 0, r = t.length; n < r; n++)Y[t[n]] ? t[n] = Y[t[n]] : t[n] = jt(t[n]);
        return function (i) {
            var s = "";
            for (n = 0; n < r; n++)s += t[n]instanceof Function ? t[n].call(i, e) : t[n];
            return s
        }
    }

    function It(e, t) {
        return e.isValid() ? (t = qt(t, e.localeData()), J[t] || (J[t] = Ft(t)), J[t](e)) : e.localeData().invalidDate()
    }

    function qt(e, t) {
        function r(e) {
            return t.longDateFormat(e) || e
        }

        var n = 5;
        S.lastIndex = 0;
        while (n >= 0 && S.test(e))e = e.replace(S, r), S.lastIndex = 0, n -= 1;
        return e
    }

    function Rt(e, t) {
        var n, r = t._strict;
        switch (e) {
            case"Q":
                return D;
            case"DDDD":
                return H;
            case"YYYY":
            case"GGGG":
            case"gggg":
                return r ? B : N;
            case"Y":
            case"G":
            case"g":
                return F;
            case"YYYYYY":
            case"YYYYY":
            case"GGGGG":
            case"ggggg":
                return r ? j : C;
            case"S":
                if (r)return D;
            case"SS":
                if (r)return P;
            case"SSS":
                if (r)return H;
            case"DDD":
                return T;
            case"MMM":
            case"MMMM":
            case"dd":
            case"ddd":
            case"dddd":
                return L;
            case"a":
            case"A":
                return t._locale._meridiemParse;
            case"x":
                return M;
            case"X":
                return _;
            case"Z":
            case"ZZ":
                return A;
            case"T":
                return O;
            case"SSSS":
                return k;
            case"MM":
            case"DD":
            case"YY":
            case"GG":
            case"gg":
            case"HH":
            case"hh":
            case"mm":
            case"ss":
            case"ww":
            case"WW":
                return r ? P : x;
            case"M":
            case"D":
            case"d":
            case"H":
            case"h":
            case"m":
            case"s":
            case"w":
            case"W":
            case"e":
            case"E":
                return x;
            case"Do":
                return r ? t._locale._ordinalParse : t._locale._ordinalParseLenient;
            default:
                return n = new RegExp(Qt(Kt(e.replace("\\", "")), "i")), n
        }
    }

    function Ut(e) {
        e = e || "";
        var t = e.match(A) || [], n = t[t.length - 1] || [], r = (n + "").match(z) || ["-", 0, 0], i = +(r[1] * 60) + Ct(r[2]);
        return r[0] === "+" ? -i : i
    }

    function zt(e, n, r) {
        var i, s = r._a;
        switch (e) {
            case"Q":
                n != null && (s[f] = (Ct(n) - 1) * 3);
                break;
            case"M":
            case"MM":
                n != null && (s[f] = Ct(n) - 1);
                break;
            case"MMM":
            case"MMMM":
                i = r._locale.monthsParse(n, e, r._strict), i != null ? s[f] = i : r._pf.invalidMonth = n;
                break;
            case"D":
            case"DD":
                n != null && (s[l] = Ct(n));
                break;
            case"Do":
                n != null && (s[l] = Ct(parseInt(n.match(/\d{1,2}/)[0], 10)));
                break;
            case"DDD":
            case"DDDD":
                n != null && (r._dayOfYear = Ct(n));
                break;
            case"YY":
                s[a] = t.parseTwoDigitYear(n);
                break;
            case"YYYY":
            case"YYYYY":
            case"YYYYYY":
                s[a] = Ct(n);
                break;
            case"a":
            case"A":
                r._isPm = r._locale.isPM(n);
                break;
            case"h":
            case"hh":
                r._pf.bigHour = !0;
            case"H":
            case"HH":
                s[c] = Ct(n);
                break;
            case"m":
            case"mm":
                s[h] = Ct(n);
                break;
            case"s":
            case"ss":
                s[p] = Ct(n);
                break;
            case"S":
            case"SS":
            case"SSS":
            case"SSSS":
                s[d] = Ct(("0." + n) * 1e3);
                break;
            case"x":
                r._d = new Date(Ct(n));
                break;
            case"X":
                r._d = new Date(parseFloat(n) * 1e3);
                break;
            case"Z":
            case"ZZ":
                r._useUTC = !0, r._tzm = Ut(n);
                break;
            case"dd":
            case"ddd":
            case"dddd":
                i = r._locale.weekdaysParse(n), i != null ? (r._w = r._w || {}, r._w.d = i) : r._pf.invalidWeekday = n;
                break;
            case"w":
            case"ww":
            case"W":
            case"WW":
            case"d":
            case"e":
            case"E":
                e = e.substr(0, 1);
            case"gggg":
            case"GGGG":
            case"GGGGG":
                e = e.substr(0, 2), n && (r._w = r._w || {}, r._w[e] = Ct(n));
                break;
            case"gg":
            case"GG":
                r._w = r._w || {}, r._w[e] = t.parseTwoDigitYear(n)
        }
    }

    function Wt(e) {
        var n, r, i, s, o, u, f;
        n = e._w, n.GG != null || n.W != null || n.E != null ? (o = 1, u = 4, r = tt(n.GG, e._a[a], an(t(), 1, 4).year), i = tt(n.W, 1), s = tt(n.E, 1)) : (o = e._locale._week.dow, u = e._locale._week.doy, r = tt(n.gg, e._a[a], an(t(), o, u).year), i = tt(n.w, 1), n.d != null ? (s = n.d, s < o && ++i) : n.e != null ? s = n.e + o : s = o), f = fn(r, i, s, u, o), e._a[a] = f.year, e._dayOfYear = f.dayOfYear
    }

    function Xt(e) {
        var t, n, r = [], i, s;
        if (e._d)return;
        i = $t(e), e._w && e._a[l] == null && e._a[f] == null && Wt(e), e._dayOfYear && (s = tt(e._a[a], i[a]), e._dayOfYear > At(s) && (e._pf._overflowDayOfYear = !0), n = rn(s, 0, e._dayOfYear), e._a[f] = n.getUTCMonth(), e._a[l] = n.getUTCDate());
        for (t = 0; t < 3 && e._a[t] == null; ++t)e._a[t] = r[t] = i[t];
        for (; t < 7; t++)e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
        e._a[c] === 24 && e._a[h] === 0 && e._a[p] === 0 && e._a[d] === 0 && (e._nextDay = !0, e._a[c] = 0), e._d = (e._useUTC ? rn : nn).apply(null, r), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() + e._tzm), e._nextDay && (e._a[c] = 24)
    }

    function Vt(e) {
        var t;
        if (e._d)return;
        t = Tt(e._i), e._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], Xt(e)
    }

    function $t(e) {
        var t = new Date;
        return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
    }

    function Jt(n) {
        if (n._f === t.ISO_8601) {
            Yt(n);
            return
        }
        n._a = [], n._pf.empty = !0;
        var r = "" + n._i, i, s, o, u, a, f = r.length, l = 0;
        o = qt(n._f, n._locale).match(E) || [];
        for (i = 0; i < o.length; i++)u = o[i], s = (r.match(Rt(u, n)) || [])[0], s && (a = r.substr(0, r.indexOf(s)), a.length > 0 && n._pf.unusedInput.push(a), r = r.slice(r.indexOf(s) + s.length), l += s.length), Y[u] ? (s ? n._pf.empty = !1 : n._pf.unusedTokens.push(u), zt(u, s, n)) : n._strict && !s && n._pf.unusedTokens.push(u);
        n._pf.charsLeftOver = f - l, r.length > 0 && n._pf.unusedInput.push(r), n._pf.bigHour === !0 && n._a[c] <= 12 && (n._pf.bigHour = e), n._isPm && n._a[c] < 12 && (n._a[c] += 12), n._isPm === !1 && n._a[c] === 12 && (n._a[c] = 0), Xt(n), Mt(n)
    }

    function Kt(e) {
        return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, r, i) {
            return t || n || r || i
        })
    }

    function Qt(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function Gt(e) {
        var t, n, r, i, s;
        if (e._f.length === 0) {
            e._pf.invalidFormat = !0, e._d = new Date(NaN);
            return
        }
        for (i = 0; i < e._f.length; i++) {
            s = 0, t = pt({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._pf = rt(), t._f = e._f[i], Jt(t);
            if (!_t(t))continue;
            s += t._pf.charsLeftOver, s += t._pf.unusedTokens.length * 10, t._pf.score = s;
            if (r == null || s < r)r = s, n = t
        }
        ht(e, n || t)
    }

    function Yt(e) {
        var t, n, r = e._i, i = I.exec(r);
        if (i) {
            e._pf.iso = !0;
            for (t = 0, n = R.length; t < n; t++)if (R[t][1].exec(r)) {
                e._f = R[t][0] + (i[6] || " ");
                break
            }
            for (t = 0, n = U.length; t < n; t++)if (U[t][1].exec(r)) {
                e._f += U[t][0];
                break
            }
            r.match(A) && (e._f += "Z"), Jt(e)
        } else e._isValid = !1
    }

    function Zt(e) {
        Yt(e), e._isValid === !1 && (delete e._isValid, t.createFromInputFallback(e))
    }

    function en(e, t) {
        var n = [], r;
        for (r = 0; r < e.length; ++r)n.push(t(e[r], r));
        return n
    }

    function tn(n) {
        var r = n._i, i;
        r === e ? n._d = new Date : Et(r) ? n._d = new Date(+r) : (i = y.exec(r)) !== null ? n._d = new Date(+i[1]) : typeof r == "string" ? Zt(n) : wt(r) ? (n._a = en(r.slice(0), function (e) {
            return parseInt(e, 10)
        }), Xt(n)) : typeof r == "object" ? Vt(n) : typeof r == "number" ? n._d = new Date(r) : t.createFromInputFallback(n)
    }

    function nn(e, t, n, r, i, s, o) {
        var u = new Date(e, t, n, r, i, s, o);
        return e < 1970 && u.setFullYear(e), u
    }

    function rn(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return e < 1970 && t.setUTCFullYear(e), t
    }

    function sn(e, t) {
        if (typeof e == "string")if (!isNaN(e))e = parseInt(e, 10); else {
            e = t.weekdaysParse(e);
            if (typeof e != "number")return null
        }
        return e
    }

    function on(e, t, n, r, i) {
        return i.relativeTime(t || 1, !!n, e, r)
    }

    function un(e, n, r) {
        var i = t.duration(e).abs(), o = s(i.as("s")), u = s(i.as("m")), a = s(i.as("h")), f = s(i.as("d")), l = s(i.as("M")), c = s(i.as("y")), h = o < K.s && ["s", o] || u === 1 && ["m"] || u < K.m && ["mm", u] || a === 1 && ["h"] || a < K.h && ["hh", a] || f === 1 && ["d"] || f < K.d && ["dd", f] || l === 1 && ["M"] || l < K.M && ["MM", l] || c === 1 && ["y"] || ["yy", c];
        return h[2] = n, h[3] = +e > 0, h[4] = r, on.apply({}, h)
    }

    function an(e, n, r) {
        var i = r - n, s = r - e.day(), o;
        return s > i && (s -= 7), s < i - 7 && (s += 7), o = t(e).add(s, "d"), {
            week: Math.ceil(o.dayOfYear() / 7),
            year: o.year()
        }
    }

    function fn(e, t, n, r, i) {
        var s = rn(e, 0, 1).getUTCDay(), o, u;
        return s = s === 0 ? 7 : s, n = n != null ? n : i, o = i - s + (s > r ? 7 : 0) - (s < i ? 7 : 0), u = 7 * (t - 1) + (n - i) + o + 1, {
            year: u > 0 ? e : e - 1,
            dayOfYear: u > 0 ? u : At(e - 1) + u
        }
    }

    function ln(n) {
        var r = n._i, i = n._f, s;
        return n._locale = n._locale || t.localeData(n._l), r === null || i === e && r === "" ? t.invalid({nullInput: !0}) : (typeof r == "string" && (n._i = r = n._locale.preparse(r)), t.isMoment(r) ? new lt(r, !0) : (i ? wt(i) ? Gt(n) : Jt(n) : tn(n), s = new lt(n), s._nextDay && (s.add(1, "d"), s._nextDay = e), s))
    }

    function cn(e, n) {
        var r, i;
        n.length === 1 && wt(n[0]) && (n = n[0]);
        if (!n.length)return t();
        r = n[0];
        for (i = 1; i < n.length; ++i)n[i][e](r) && (r = n[i]);
        return r
    }

    function hn(e, t) {
        var n;
        if (typeof t == "string") {
            t = e.localeData().monthsParse(t);
            if (typeof t != "number")return e
        }
        return n = Math.min(e.date(), kt(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e
    }

    function pn(e, t) {
        return e._d["get" + (e._isUTC ? "UTC" : "") + t]()
    }

    function dn(e, t, n) {
        return t === "Month" ? hn(e, n) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
    }

    function vn(e, n) {
        return function (r) {
            return r != null ? (dn(this, e, r), t.updateOffset(this, n), this) : pn(this, e)
        }
    }

    function mn(e) {
        return e * 400 / 146097
    }

    function gn(e) {
        return e * 146097 / 400
    }

    function yn(e) {
        t.duration.fn[e] = function () {
            return this._data[e]
        }
    }

    function bn(e) {
        if (typeof ender != "undefined")return;
        i = r.moment, e ? r.moment = st("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", t) : r.moment = t
    }

    var t, n = "2.8.4", r = typeof global != "undefined" ? global : this, i, s = Math.round, o = Object.prototype.hasOwnProperty, u, a = 0, f = 1, l = 2, c = 3, h = 4, p = 5, d = 6, v = {}, m = [], g = typeof module != "undefined" && module && module.exports, y = /^\/?Date\((\-?\d+)/i, b = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, w = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, E = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, S = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, x = /\d\d?/, T = /\d{1,3}/, N = /\d{1,4}/, C = /[+\-]?\d{1,6}/, k = /\d+/, L = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, A = /Z|[\+\-]\d\d:?\d\d/gi, O = /T/i, M = /[\+\-]?\d+/, _ = /[\+\-]?\d+(\.\d{1,3})?/, D = /\d/, P = /\d\d/, H = /\d{3}/, B = /\d{4}/, j = /[+-]?\d{6}/, F = /[+-]?\d+/, I = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, q = "YYYY-MM-DDTHH:mm:ssZ", R = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], U = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], z = /([\+\-]|\d\d)/gi, W = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), X = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }, V = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        Q: "quarter",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, $ = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, J = {}, K = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, Q = "DDD w W M D d".split(" "), G = "M D H h m s w W".split(" "), Y = {
        M: function () {
            return this.month() + 1
        }, MMM: function (e) {
            return this.localeData().monthsShort(this, e)
        }, MMMM: function (e) {
            return this.localeData().months(this, e)
        }, D: function () {
            return this.date()
        }, DDD: function () {
            return this.dayOfYear()
        }, d: function () {
            return this.day()
        }, dd: function (e) {
            return this.localeData().weekdaysMin(this, e)
        }, ddd: function (e) {
            return this.localeData().weekdaysShort(this, e)
        }, dddd: function (e) {
            return this.localeData().weekdays(this, e)
        }, w: function () {
            return this.week()
        }, W: function () {
            return this.isoWeek()
        }, YY: function () {
            return vt(this.year() % 100, 2)
        }, YYYY: function () {
            return vt(this.year(), 4)
        }, YYYYY: function () {
            return vt(this.year(), 5)
        }, YYYYYY: function () {
            var e = this.year(), t = e >= 0 ? "+" : "-";
            return t + vt(Math.abs(e), 6)
        }, gg: function () {
            return vt(this.weekYear() % 100, 2)
        }, gggg: function () {
            return vt(this.weekYear(), 4)
        }, ggggg: function () {
            return vt(this.weekYear(), 5)
        }, GG: function () {
            return vt(this.isoWeekYear() % 100, 2)
        }, GGGG: function () {
            return vt(this.isoWeekYear(), 4)
        }, GGGGG: function () {
            return vt(this.isoWeekYear(), 5)
        }, e: function () {
            return this.weekday()
        }, E: function () {
            return this.isoWeekday()
        }, a: function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), !0)
        }, A: function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), !1)
        }, H: function () {
            return this.hours()
        }, h: function () {
            return this.hours() % 12 || 12
        }, m: function () {
            return this.minutes()
        }, s: function () {
            return this.seconds()
        }, S: function () {
            return Ct(this.milliseconds() / 100)
        }, SS: function () {
            return vt(Ct(this.milliseconds() / 10), 2)
        }, SSS: function () {
            return vt(this.milliseconds(), 3)
        }, SSSS: function () {
            return vt(this.milliseconds(), 3)
        }, Z: function () {
            var e = -this.zone(), t = "+";
            return e < 0 && (e = -e, t = "-"), t + vt(Ct(e / 60), 2) + ":" + vt(Ct(e) % 60, 2)
        }, ZZ: function () {
            var e = -this.zone(), t = "+";
            return e < 0 && (e = -e, t = "-"), t + vt(Ct(e / 60), 2) + vt(Ct(e) % 60, 2)
        }, z: function () {
            return this.zoneAbbr()
        }, zz: function () {
            return this.zoneName()
        }, x: function () {
            return this.valueOf()
        }, X: function () {
            return this.unix()
        }, Q: function () {
            return this.quarter()
        }
    }, Z = {}, et = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"];
    while (Q.length)u = Q.pop(), Y[u + "o"] = at(Y[u], u);
    while (G.length)u = G.pop(), Y[u + u] = ut(Y[u], 2);
    Y.DDDD = ut(Y.DDD, 3), ht(ft.prototype, {
        set: function (e) {
            var t, n;
            for (n in e)t = e[n], typeof t == "function" ? this[n] = t : this["_" + n] = t;
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function (e) {
            return this._months[e.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function (e) {
            return this._monthsShort[e.month()]
        },
        monthsParse: function (e, n, r) {
            var i, s, o;
            this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []);
            for (i = 0; i < 12; i++) {
                s = t.utc([2e3, i]), r && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(s, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$", "i")), !r && !this._monthsParse[i] && (o = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[i] = new RegExp(o.replace(".", ""), "i"));
                if (r && n === "MMMM" && this._longMonthsParse[i].test(e))return i;
                if (r && n === "MMM" && this._shortMonthsParse[i].test(e))return i;
                if (!r && this._monthsParse[i].test(e))return i
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function (e) {
            return this._weekdays[e.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function (e) {
            return this._weekdaysShort[e.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function (e) {
            return this._weekdaysMin[e.day()]
        },
        weekdaysParse: function (e) {
            var n, r, i;
            this._weekdaysParse || (this._weekdaysParse = []);
            for (n = 0; n < 7; n++) {
                this._weekdaysParse[n] || (r = t([2e3, 1]).day(n), i = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[n] = new RegExp(i.replace(".", ""), "i"));
                if (this._weekdaysParse[n].test(e))return n
            }
        },
        _longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function (e) {
            var t = this._longDateFormat[e];
            return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (e) {
                return e.slice(1)
            }), this._longDateFormat[e] = t), t
        },
        isPM: function (e) {
            return (e + "").toLowerCase().charAt(0) === "p"
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function (e, t, n) {
            return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function (e, t, n) {
            var r = this._calendar[e];
            return typeof r == "function" ? r.apply(t, [n]) : r
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function (e, t, n, r) {
            var i = this._relativeTime[n];
            return typeof i == "function" ? i(e, t, n, r) : i.replace(/%d/i, e)
        },
        pastFuture: function (e, t) {
            var n = this._relativeTime[e > 0 ? "future" : "past"];
            return typeof n == "function" ? n(t) : n.replace(/%s/i, t)
        },
        ordinal: function (e) {
            return this._ordinal.replace("%d", e)
        },
        _ordinal: "%d",
        _ordinalParse: /\d{1,2}/,
        preparse: function (e) {
            return e
        },
        postformat: function (e) {
            return e
        },
        week: function (e) {
            return an(e, this._week.dow, this._week.doy).week
        },
        _week: {dow: 0, doy: 6},
        _invalidDate: "Invalid date",
        invalidDate: function () {
            return this._invalidDate
        }
    }), t = function (t, n, r, i) {
        var s;
        return typeof r == "boolean" && (i = r, r = e), s = {}, s._isAMomentObject = !0, s._i = t, s._f = n, s._l = r, s._strict = i, s._isUTC = !1, s._pf = rt(), ln(s)
    }, t.suppressDeprecationWarnings = !1, t.createFromInputFallback = st("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }), t.min = function () {
        var e = [].slice.call(arguments, 0);
        return cn("isBefore", e)
    }, t.max = function () {
        var e = [].slice.call(arguments, 0);
        return cn("isAfter", e)
    }, t.utc = function (t, n, r, i) {
        var s;
        return typeof r == "boolean" && (i = r, r = e), s = {}, s._isAMomentObject = !0, s._useUTC = !0, s._isUTC = !0, s._l = r, s._i = t, s._f = n, s._strict = i, s._pf = rt(), ln(s).utc()
    }, t.unix = function (e) {
        return t(e * 1e3)
    }, t.duration = function (e, n) {
        var r = e, i = null, s, o, u, a;
        return t.isDuration(e) ? r = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : typeof e == "number" ? (r = {}, n ? r[n] = e : r.milliseconds = e) : (i = b.exec(e)) ? (s = i[1] === "-" ? -1 : 1, r = {
            y: 0,
            d: Ct(i[l]) * s,
            h: Ct(i[c]) * s,
            m: Ct(i[h]) * s,
            s: Ct(i[p]) * s,
            ms: Ct(i[d]) * s
        }) : (i = w.exec(e)) ? (s = i[1] === "-" ? -1 : 1, u = function (e) {
            var t = e && parseFloat(e.replace(",", "."));
            return (isNaN(t) ? 0 : t) * s
        }, r = {
            y: u(i[2]),
            M: u(i[3]),
            d: u(i[4]),
            h: u(i[5]),
            m: u(i[6]),
            s: u(i[7]),
            w: u(i[8])
        }) : typeof r == "object" && ("from"in r || "to"in r) && (a = gt(t(r.from), t(r.to)), r = {}, r.ms = a.milliseconds, r.M = a.months), o = new ct(r), t.isDuration(e) && nt(e, "_locale") && (o._locale = e._locale), o
    }, t.version = n, t.defaultFormat = q, t.ISO_8601 = function () {
    }, t.momentProperties = m, t.updateOffset = function () {
    }, t.relativeTimeThreshold = function (t, n) {
        return K[t] === e ? !1 : n === e ? K[t] : (K[t] = n, !0)
    }, t.lang = st("moment.lang is deprecated. Use moment.locale instead.", function (e, n) {
        return t.locale(e, n)
    }), t.locale = function (e, n) {
        var r;
        return e && (typeof n != "undefined" ? r = t.defineLocale(e, n) : r = t.localeData(e), r && (t.duration._locale = t._locale = r)), t._locale._abbr
    }, t.defineLocale = function (e, n) {
        return n !== null ? (n.abbr = e, v[e] || (v[e] = new ft), v[e].set(n), t.locale(e), v[e]) : (delete v[e], null)
    }, t.langData = st("moment.langData is deprecated. Use moment.localeData instead.", function (e) {
        return t.localeData(e)
    }), t.localeData = function (e) {
        var n;
        e && e._locale && e._locale._abbr && (e = e._locale._abbr);
        if (!e)return t._locale;
        if (!wt(e)) {
            n = Ht(e);
            if (n)return n;
            e = [e]
        }
        return Pt(e)
    }, t.isMoment = function (e) {
        return e instanceof lt || e != null && nt(e, "_isAMomentObject")
    }, t.isDuration = function (e) {
        return e instanceof ct
    };
    for (u = et.length - 1; u >= 0; --u)Nt(et[u]);
    t.normalizeUnits = function (e) {
        return xt(e)
    }, t.invalid = function (e) {
        var n = t.utc(NaN);
        return e != null ? ht(n._pf, e) : n._pf.userInvalidated = !0, n
    }, t.parseZone = function () {
        return t.apply(null, arguments).parseZone()
    }, t.parseTwoDigitYear = function (e) {
        return Ct(e) + (Ct(e) > 68 ? 1900 : 2e3)
    }, ht(t.fn = lt.prototype, {
        clone: function () {
            return t(this)
        },
        valueOf: function () {
            return +this._d + (this._offset || 0) * 6e4
        },
        unix: function () {
            return Math.floor(+this / 1e3)
        },
        toString: function () {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function () {
            return this._offset ? new Date(+this) : this._d
        },
        toISOString: function () {
            var e = t(this).utc();
            return 0 < e.year() && e.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : It(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : It(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        toArray: function () {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
        },
        isValid: function () {
            return _t(this)
        },
        isDSTShifted: function () {
            return this._a ? this.isValid() && St(this._a, (this._isUTC ? t.utc(this._a) : t(this._a)).toArray()) > 0 : !1
        },
        parsingFlags: function () {
            return ht({}, this._pf)
        },
        invalidAt: function () {
            return this._pf.overflow
        },
        utc: function (e) {
            return this.zone(0, e)
        },
        local: function (e) {
            return this._isUTC && (this.zone(0, e), this._isUTC = !1, e && this.add(this._dateTzOffset(), "m")), this
        },
        format: function (e) {
            var n = It(this, e || t.defaultFormat);
            return this.localeData().postformat(n)
        },
        add: yt(1, "add"),
        subtract: yt(-1, "subtract"),
        diff: function (e, n, r) {
            var i = Bt(e, this), s = (this.zone() - i.zone()) * 6e4, o, u, a;
            return n = xt(n), n === "year" || n === "month" ? (o = (this.daysInMonth() + i.daysInMonth()) * 432e5, u = (this.year() - i.year()) * 12 + (this.month() - i.month()), a = this - t(this).startOf("month") - (i - t(i).startOf("month")), a -= (this.zone() - t(this).startOf("month").zone() - (i.zone() - t(i).startOf("month").zone())) * 6e4, u += a / o, n === "year" && (u /= 12)) : (o = this - i, u = n === "second" ? o / 1e3 : n === "minute" ? o / 6e4 : n === "hour" ? o / 36e5 : n === "day" ? (o - s) / 864e5 : n === "week" ? (o - s) / 6048e5 : o), r ? u : dt(u)
        },
        from: function (e, n) {
            return t.duration({to: this, from: e}).locale(this.locale()).humanize(!n)
        },
        fromNow: function (e) {
            return this.from(t(), e)
        },
        calendar: function (e) {
            var n = e || t(), r = Bt(n, this).startOf("day"), i = this.diff(r, "days", !0), s = i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(s, this, t(n)))
        },
        isLeapYear: function () {
            return Ot(this.year())
        },
        isDST: function () {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
        },
        day: function (e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return e != null ? (e = sn(e, this.localeData()), this.add(e - t, "d")) : t
        },
        month: vn("Month", !0),
        startOf: function (e) {
            e = xt(e);
            switch (e) {
                case"year":
                    this.month(0);
                case"quarter":
                case"month":
                    this.date(1);
                case"week":
                case"isoWeek":
                case"day":
                    this.hours(0);
                case"hour":
                    this.minutes(0);
                case"minute":
                    this.seconds(0);
                case"second":
                    this.milliseconds(0)
            }
            return e === "week" ? this.weekday(0) : e === "isoWeek" && this.isoWeekday(1), e === "quarter" && this.month(Math.floor(this.month() / 3) * 3), this
        },
        endOf: function (t) {
            return t = xt(t), t === e || t === "millisecond" ? this : this.startOf(t).add(1, t === "isoWeek" ? "week" : t).subtract(1, "ms")
        },
        isAfter: function (e, n) {
            var r;
            return n = xt(typeof n != "undefined" ? n : "millisecond"), n === "millisecond" ? (e = t.isMoment(e) ? e : t(e), +this > +e) : (r = t.isMoment(e) ? +e : +t(e), r < +this.clone().startOf(n))
        },
        isBefore: function (e, n) {
            var r;
            return n = xt(typeof n != "undefined" ? n : "millisecond"), n === "millisecond" ? (e = t.isMoment(e) ? e : t(e), +this < +e) : (r = t.isMoment(e) ? +e : +t(e), +this.clone().endOf(n) < r)
        },
        isSame: function (e, n) {
            var r;
            return n = xt(n || "millisecond"), n === "millisecond" ? (e = t.isMoment(e) ? e : t(e), +this === +e) : (r = +t(e), +this.clone().startOf(n) <= r && r <= +this.clone().endOf(n))
        },
        min: st("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function (e) {
            return e = t.apply(null, arguments), e < this ? this : e
        }),
        max: st("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function (e) {
            return e = t.apply(null, arguments), e > this ? this : e
        }),
        zone: function (e, n) {
            var r = this._offset || 0, i;
            return e == null ? this._isUTC ? r : this._dateTzOffset() : (typeof e == "string" && (e = Ut(e)), Math.abs(e) < 16 && (e *= 60), !this._isUTC && n && (i = this._dateTzOffset()), this._offset = e, this._isUTC = !0, i != null && this.subtract(i, "m"), r !== e && (!n || this._changeInProgress ? bt(this, t.duration(r - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this)
        },
        zoneAbbr: function () {
            return this._isUTC ? "UTC" : ""
        },
        zoneName: function () {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        parseZone: function () {
            return this._tzm ? this.zone(this._tzm) : typeof this._i == "string" && this.zone(this._i), this
        },
        hasAlignedHourOffset: function (e) {
            return e ? e = t(e).zone() : e = 0, (this.zone() - e) % 60 === 0
        },
        daysInMonth: function () {
            return kt(this.year(), this.month())
        },
        dayOfYear: function (e) {
            var n = s((t(this).startOf("day") - t(this).startOf("year")) / 864e5) + 1;
            return e == null ? n : this.add(e - n, "d")
        },
        quarter: function (e) {
            return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3)
        },
        weekYear: function (e) {
            var t = an(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return e == null ? t : this.add(e - t, "y")
        },
        isoWeekYear: function (e) {
            var t = an(this, 1, 4).year;
            return e == null ? t : this.add(e - t, "y")
        },
        week: function (e) {
            var t = this.localeData().week(this);
            return e == null ? t : this.add((e - t) * 7, "d")
        },
        isoWeek: function (e) {
            var t = an(this, 1, 4).week;
            return e == null ? t : this.add((e - t) * 7, "d")
        },
        weekday: function (e) {
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return e == null ? t : this.add(e - t, "d")
        },
        isoWeekday: function (e) {
            return e == null ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
        },
        isoWeeksInYear: function () {
            return Lt(this.year(), 1, 4)
        },
        weeksInYear: function () {
            var e = this.localeData()._week;
            return Lt(this.year(), e.dow, e.doy)
        },
        get: function (e) {
            return e = xt(e), this[e]()
        },
        set: function (e, t) {
            return e = xt(e), typeof this[e] == "function" && this[e](t), this
        },
        locale: function (n) {
            var r;
            return n === e ? this._locale._abbr : (r = t.localeData(n), r != null && (this._locale = r), this)
        },
        lang: st("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
            return t === e ? this.localeData() : this.locale(t)
        }),
        localeData: function () {
            return this._locale
        },
        _dateTzOffset: function () {
            return Math.round(this._d.getTimezoneOffset() / 15) * 15
        }
    }), t.fn.millisecond = t.fn.milliseconds = vn("Milliseconds", !1), t.fn.second = t.fn.seconds = vn("Seconds", !1), t.fn.minute = t.fn.minutes = vn("Minutes", !1), t.fn.hour = t.fn.hours = vn("Hours", !0), t.fn.date = vn("Date", !0), t.fn.dates = st("dates accessor is deprecated. Use date instead.", vn("Date", !0)), t.fn.year = vn("FullYear", !0), t.fn.years = st("years accessor is deprecated. Use year instead.", vn("FullYear", !0)), t.fn.days = t.fn.day, t.fn.months = t.fn.month, t.fn.weeks = t.fn.week, t.fn.isoWeeks = t.fn.isoWeek, t.fn.quarters = t.fn.quarter, t.fn.toJSON = t.fn.toISOString, ht(t.duration.fn = ct.prototype, {
        _bubble: function () {
            var e = this._milliseconds, t = this._days, n = this._months, r = this._data, i, s, o, u = 0;
            r.milliseconds = e % 1e3, i = dt(e / 1e3), r.seconds = i % 60, s = dt(i / 60), r.minutes = s % 60, o = dt(s / 60), r.hours = o % 24, t += dt(o / 24), u = dt(mn(t)), t -= dt(gn(u)), n += dt(t / 30), t %= 30, u += dt(n / 12), n %= 12, r.days = t, r.months = n, r.years = u
        },
        abs: function () {
            return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
        },
        weeks: function () {
            return dt(this.days() / 7)
        },
        valueOf: function () {
            return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + Ct(this._months / 12) * 31536e6
        },
        humanize: function (e) {
            var t = un(this, !e, this.localeData());
            return e && (t = this.localeData().pastFuture(+this, t)), this.localeData().postformat(t)
        },
        add: function (e, n) {
            var r = t.duration(e, n);
            return this._milliseconds += r._milliseconds, this._days += r._days, this._months += r._months, this._bubble(), this
        },
        subtract: function (e, n) {
            var r = t.duration(e, n);
            return this._milliseconds -= r._milliseconds, this._days -= r._days, this._months -= r._months, this._bubble(), this
        },
        get: function (e) {
            return e = xt(e), this[e.toLowerCase() + "s"]()
        },
        as: function (e) {
            var t, n;
            e = xt(e);
            if (e === "month" || e === "year")return t = this._days + this._milliseconds / 864e5, n = this._months + mn(t) * 12, e === "month" ? n : n / 12;
            t = this._days + Math.round(gn(this._months / 12));
            switch (e) {
                case"week":
                    return t / 7 + this._milliseconds / 6048e5;
                case"day":
                    return t + this._milliseconds / 864e5;
                case"hour":
                    return t * 24 + this._milliseconds / 36e5;
                case"minute":
                    return t * 24 * 60 + this._milliseconds / 6e4;
                case"second":
                    return t * 24 * 60 * 60 + this._milliseconds / 1e3;
                case"millisecond":
                    return Math.floor(t * 24 * 60 * 60 * 1e3) + this._milliseconds;
                default:
                    throw new Error("Unknown unit " + e)
            }
        },
        lang: t.fn.lang,
        locale: t.fn.locale,
        toIsoString: st("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function () {
            return this.toISOString()
        }),
        toISOString: function () {
            var e = Math.abs(this.years()), t = Math.abs(this.months()), n = Math.abs(this.days()), r = Math.abs(this.hours()), i = Math.abs(this.minutes()), s = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (n ? n + "D" : "") + (r || i || s ? "T" : "") + (r ? r + "H" : "") + (i ? i + "M" : "") + (s ? s + "S" : "") : "P0D"
        },
        localeData: function () {
            return this._locale
        }
    }), t.duration.fn.toString = t.duration.fn.toISOString;
    for (u in X)nt(X, u) && yn(u.toLowerCase());
    t.duration.fn.asMilliseconds = function () {
        return this.as("ms")
    }, t.duration.fn.asSeconds = function () {
        return this.as("s")
    }, t.duration.fn.asMinutes = function () {
        return this.as("m")
    }, t.duration.fn.asHours = function () {
        return this.as("h")
    }, t.duration.fn.asDays = function () {
        return this.as("d")
    }, t.duration.fn.asWeeks = function () {
        return this.as("weeks")
    }, t.duration.fn.asMonths = function () {
        return this.as("M")
    }, t.duration.fn.asYears = function () {
        return this.as("y")
    }, t.locale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (e) {
            var t = e % 10, n = Ct(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return e + n
        }
    }), g ? module.exports = t : typeof define == "function" && define.amd ? (define("moment", ["require", "exports", "module"], function (e, n, s) {
        return s.config && s.config() && s.config().noGlobal === !0 && (r.moment = i), t
    }), bn(!0)) : bn()
}.call(this), define("lehu.h5.business.config", ["zepto"], function (e) {
    var t = "http://app.lehumall.com/html5/app/", n = "http://app.lehumall.com/", r = e("#version").attr("data-version") || Date.now(), i = {
        index: t + "?t=" + r,
        list: t + "list.html?t=" + r
    }, s = {
        appNewIndexFirst: "initIndex.do",
        goodsCategoryList: "goodsList.do",
        goodsInfo: "goodsInfo.do",
        getLHTicket: "getLHTicket.do",
        login: "forge/login.do",
        register: "forge/register.do",
        verifycode: "appMessageVerify.do",
        appFindPasswordSave: "appFindPasswordSave.do",
        ticketData: "ticketData.do",
        queryRegistrationAgreement: "forge/queryRegistrationAgreement.do",
        login4Code: "forge/login4Code.do",
        addFocus: "addFocus.do",
        cancelFocus: "cancelFocus.do",
        queryGoodsReview: "queryGoodsReview.do",
        goodsContent: "goodsContent.do",
        queryGoodsStock: "queryGoodsStock.do",
        queryFilteredRegion: "queryFilteredRegion.do",
        addCart: "addCart.do",
        cartPromptlyInitLoad: "cartPromptlyInitLoad.do",
        getKey: "getKey.do"
    };
    return {setting: {ver: r, REQUEST_HOST: n, action: s, link: i}}
}), define("lehu.h5.framework.comm", ["zepto", "zepto.cookie", "can", "underscore", "md5", "store", "lehu.h5.business.config"], function (e, t, n, r, i, s, o) {
    n.route.ready();
    var u = n.Construct.extend({
        api: {}, init: function (e) {
            this.setData(e)
        }, setData: function (e) {
            this.url = e.url, this.data = e.data, this.method = e.method
        }, sendRequest: function (e, t) {
            var n = this.buildRequestData(), r = this.getMethod();
            return this.request(n, r, e)

        }, buildRequestData: function () {
            return this.data
        }, getMethod: function () {
            return this.method
        }, checkUserLogin: function () {
            var t = s.get("csrfToken");
            return !!e.fn.cookie(u._aid + "_ct") && !!t
        }, goToLogin: function () {
            var e = window.location.href;
            e !== o.setting.login && (window.location.href = "/login.html?from=" + escape(e))
        }, request: function (t, r, i) {
            var s = n.Deferred(), o = this, u = function (e) {
                s.resolve(e)
            }, a = function (e) {
                s.reject(e)
            };
            return e.ajax({
                url: this.url,
                type: r || "get",
                contentType: r == "get" ? "text/x-json;charset=UTF-8" : "application/x-www-form-urlencoded; charset=UTF-8",
                data: t,
                success: function (e) {
                    var t;
                    try {
                        t = JSON.parse(e);
                    } catch(error) {

                        t = e;
                    }
                    // var t = JSON.parse(e);
                   u(t);
                },
                fail: function (e) {
                    a(e)
                }
            }).done(function (e) {
                var t;
                try {
                    t = JSON.parse(e);
                } catch(error) {

                    t = e;
                }
                // var t = JSON.parse(e);
                u(t);
            }).fail(function (e) {
                a(e)
            }), s
        }, getServerTime: function () {
            return this.serverTime
        }, ajax: function (e) {
            return n.ajax(e)
        }
    });
    return u
}), define("lehu.util", ["zepto", "can", "underscore", "md5", "store", "lehu.h5.business.config"], function (e, t, n, r, i, s) {
    return t.route.ready(), window.onerror = function (e, t, n) {
    }, {
        checkEmail: function (e) {
            return /^([a-zA-Z0-9-_]*[-_\.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\.][a-zA-Z]{2,3}([\.][a-zA-Z]{2})?$/.test(e)
        }, dotCode: function () {
            window.LHHT && window.LHHT.T && window.LHHT.T.send && LHHT.T.send()
        }, isMobile: {
            Android: function () {
                return navigator.userAgent.match(/Android/i)
            }, AndroidApp: function () {
                return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Adr/i)
            }, BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i)
            }, iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i)
            }, iOSApp: function () {
                return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            }, Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i)
            }, Windows: function () {
                return navigator.userAgent.match(/IEMobile/i)
            }, Firefox: function () {
                return navigator.userAgent.indexOf("Firefox") > -1
            }, QQ: function () {
                return navigator.userAgent.indexOf("QQ") > -1
            }, WeChat: function () {
                var e = navigator.userAgent.match(/MicroMessenger/i);
                return e && i.remove("IS_APP"), e
            }, AlipayChat: function () {
                var e = navigator.userAgent.match(/AlipayClient/i);
                return e && i.remove("IS_APP"), e
            }, APP: function () {
                var e = s.setting.is_app || i.get("IS_APP"), t = window.location.hash, n = window.location.search, r = n + t;
                return e ? e : r.indexOf("platform=android") > -1 ? (i.set("IS_APP", "android"), "android") : r.indexOf("platform=ios") > -1 ? (i.set("IS_APP", "ios"), "ios") : !1
            }, onlineApp: function () {
                return this.APP() && !window.cordova ? !0 : !1
            }, localApp: function () {
                return this.APP() && window.cordova && window.sf ? !0 : !1
            }, any: function () {
                return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows() || this.Firefox()
            }
        }, namespace: function (e) {
            var t = e.split("."), n = sf;
            for (var r = 0; r < t.length; r++)n[t[r]] = n[t[r]] || {}, n = n[t[r]];
            return n
        }, access: function (e, t) {
            if (e.stat.code === 0 && e.content[0] && e.stat.stateList[0].code === 0)return !0;
            if (e.stat.code != -180 && e.stat.code != -360)return !1;
            if (t) {
                var n = window.location.pathname;
                n != "/login.html" && (window.location.href = "http://m.fengqu.com/user/login.html")
            }
        }, clean: function (e) {
            return n.each(e, function (t, r, i) {
                (n.isUndefined(t) || n.isNull(t)) && delete e[r]
            }), e
        }, encrypt: function (e, t) {
            n.each(e, function (t, r, i) {
                n.isUndefined(t) && delete e[r]
            });
            var i = [];
            n.each(e, function (e, t, n) {
                i.push(t + "=" + e)
            }), i.sort();
            var s = i.join("");
            return s += t, r(s)
        }, tip: function (t, n) {
            var r = e('<div class="dialog-cart" style="z-index:9999;"><div class="dialog-cart-inner" style="width:242px;padding:20px 60px;"><p style="margin-bottom:10px;">' + t + "</p></div></div>");
            if (e(".dialog-cart").length > 0)return !1;
            e(document.body).append(r), e(".closeDialog").click(function (e) {
                r.remove()
            }), setTimeout(function () {
                r.remove()
            }, n || "3000")
        }, sign: function (e, t) {
            var r = this, s = {
                NONE: function (e, t) {
                    var r = "sfhaitao.xyz!";
                    return n.extend(e, {_sig: sf.util.encrypt(e, r)})
                }, USERLOGIN: function (e, t) {
                    var s = i.get("csrfToken");
                    if (s)return n.extend(e, {_sig: r.encrypt(e, s)});
                    if (!t)return e;
                    var o = window.location.pathname;
                    o != "/login.html" && (window.location.href = "http://m.fengqu.com/user/login.html")
                }
            }, o = s[e.level];
            if (n.isFunction(o)) {
                var u = n.extend(e.data, {_aid: 1, _sm: "md5"});
                return o(u)
            }
            return e.data
        }

    }
}), define("lehu.h5.framework.global", ["can", "lehu.util"], function (e, t) {
    var n = e.Control.extend({
        init: function () {
            this.initRem(), this.showDocument(), this.doStyles()
        }, doStyles: function () {
            if (t.isMobile.Android()) {
                var e = document.createElement("link");
                e.href = "styles/lehu.h5.android.css", e.rel = "stylesheet", e.type = "text/css", document.getElementsByTagName("head").item(0).appendChild(e)
            }
        }, showDocument: function () {
            var e = this;
            $(document).ready(function (t) {
                e.setDocumentVisibility()
            }), setTimeout(function () {
                e.setDocumentVisibility()
            }, 200)
        }, setDocumentVisibility: function () {
            $("body").css("visibility", "visible"), $("body").addClass("jbox")
        }, initRem: function (e) {
            this.recalc();
            if (!document.addEventListener)return !1;
            window.addEventListener("orientationchange"in window ? "orientationchange" : "resize", this.recalc, !1), document.addEventListener("DOMContentLoaded", this.recalc, !1)
        }, recalc: function () {
            var e = document.documentElement.clientWidth, e = $(".nwrapper").width(), t = 750, n = ["index.html", "list.html", "404.html", "404_index.html"], r = _.find(n, function (e) {
                return location.href.indexOf(e) > -1
            });
            r && (t = 640), document.documentElement.style.fontSize = 100 * (e / t) + "px"
        }
    });
    return new n
}), define("lehu.h5.api", ["zepto", "can", "underscore", "lehu.h5.framework.comm"], function (e, t, n, r) {
    return r.extend({api: {}})
}), define("lehu.hybrid", ["zepto", "can", "underscore", "md5", "store", "lehu.util"], function (e, t, n, r, i, s) {
    var o = t.deparam(window.location.search.substr(1)), u = function (e) {
        if (window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);
        if (window.WVJBCallbacks)return window.WVJBCallbacks.push(e);
        window.WVJBCallbacks = [e];
        var t = document.createElement("iframe");
        t.style.display = "none", t.src = "https://__bridge_loaded__", document.documentElement.appendChild(t), setTimeout(function () {
            document.documentElement.removeChild(t)
        }, 0)
    }, a = function () {
        var e = {};
        e.SERVER_URL_NJ = "http://172.16.201.68:8082/";
        if (s.isMobile.Android() && window.JSInterface)e.SERVER_URL = JSInterface.getServerUrl(), e.IMAGE_URL = JSInterface.getImageUrl(); else {
            var t = window.location.host;
            t.indexOf("http://") == -1 && (t = "http://" + t), e.SERVER_URL = t + "/", e.IMAGE_URL = "http://lehumall.b0.upaiyun.com/"
        }
        return e
    },   f = function (e) {
        s.isMobile.Android() ? (e = JSON.stringify(e), JSInterface.nativeFunction(e)) : s.isMobile.iOS() ( u(function (t) {
            t.callHandler(e.funName, e.params, function (t) {
                console.log("JS received response:", t)
            })
        }))
    };
    return {getUrl: a, nativeFun: f}
}), "use strict", define("lehu.bridge", ["zepto", "zepto.cookie", "can", "underscore"], function (e, t, n, r) {
    var i = function () {
    }, s = n.Control.extend({
        init: function () {
            this.troops = {};
            var t = n.route.attr("version") || e.fn.cookie("version");
            if (t) {
                var r = t.split(".");
                this.version = r.join(""), e.fn.cookie("version", this.version)
            }
        }, register: function (e, t) {
            var n = Date.now(), r = "sfht_" + n;
            return this.troops[r] = {success: e || i, error: t || i}, r
        }, run: function (t, n, i, s, o) {
            var u = this.register(s, o), a, f = JSON.stringify(i);
            try {
                r.isArray(i) ? a = window.sfhtandroidbridge.runner(t, n, f, u) : (f = "[" + f + "]", a = window.sfhtandroidbridge.runner(t, n, f, u))
            } catch (l) {
                console.log(l.name + ":" + l.message)
            }
            if (!a && this.version && this.version >= 130) {
                var c = "sfhtbridge://service/pluginHelper?plugin=" + t + "&method=" + n + "&params=" + encodeURIComponent(f) + "&callbackId=" + u;
                if (e("#apprunner").length == 0) {
                    var h = e('<iframe id="apprunner" style="height:0px"></iframe>');
                    h.attr("src", c), e("body").append(h)
                } else e("#apprunner").attr("src", c)
            }
        }
    });
    window.bridge = new s, window.sfhtcallback = function (e, t, n, i) {
        var s = {0: "error", 1: "success"}, o = s[t];
        if (window.bridge.troops && window.bridge.troops[e]) {
            var u = window.bridge.troops[e][o];
            return r.isFunction(u) && u.call(window.bridge, n), i || delete window.bridge.troops[e], !0
        }
        return !1
    }
}), define("lehu.helpers", ["zepto", "can", "underscore", "moment"], function (e, t, n, r) {
    t.Mustache.registerHelper("sf.toggle", function (e) {
        return function (t) {
            new Toggle(t, {value: e})
        }
    }), t.Mustache.registerHelper("sf.time", function (e, t) {
        return n.isFunction(e) && (e = e()), n.isObject(arguments[1]) && (t = "YYYY-MM-DD HH:mm:ss"), r(e).format(t)
    }), t.Mustache.registerHelper("sf.timeMDH", function (e) {
        return n.isFunction(e) && (e = e()), r(e).format("M月D日H点")
    }), t.Mustache.registerHelper("sf.timeYMD", function (e) {
        return n.isFunction(e) && (e = e()), r(e).format("YYYY-MM-DD")
    }), t.Mustache.registerHelper("sf.split", function (e) {
        return n.isFunction(e) && (e = e()), e.length > 3 ? e : e.split("").join(" ")
    }), t.Mustache.registerHelper("sf.price", function (e) {
        var t = function (t) {
            n.isFunction(t) && (e = t())
        };
        while (n.isFunction(e))t(e);
        return (e / 100).toString()
    }), t.Mustache.registerHelper("sf.img", function (e, t) {
        n.isFunction(e) && (e = e());
        var r = [];
        n.isString(e) ? r = e.split(",") : n.isArray(e) && (r = e);
        var i = n.str.include(r[0], "http://");
        return i ? r[0] : "http://img0.fengqucdn.com/" + r[0]
    })
}), define("lehu.env.switcher", ["zepto", "can", "underscore", "lehu.util"], function (e, t, n, r) {
    var i = ["web", "wechat", "alipay", "localapp", "onlineapp", "app"], s = "web";
    return t.Control.extend({
        init: function () {
            this.options.env = this.getEnvInfo(), this.options.group = {}
        }, getEnvInfo: function () {
            var e = "web", t = {
                wechat: function () {
                    return r.isMobile.WeChat()
                }, alipay: function () {
                    return r.isMobile.AlipayChat()
                }, localapp: function () {
                    return r.isMobile.localApp()
                }, onlineapp: function () {
                    return r.isMobile.onlineApp()
                }, app: function () {
                    return r.isMobile.APP()
                }
            }, n = [];
            for (var i in t)t[i]() && n.push(i);
            return n.length > 0 ? n : [e]
        }, register: function (e, t) {
            var r = function (e) {
                n.contains(i, e) && (this.options.group[e] = t)
            };
            n.isArray(e) ? n.each(e, n.bind(r, this)) : r.call(this, e)
        }, go: function () {
            var e = this.options.group[s];
            for (var t in this.options.env) {
                var r = this.options.group[this.options.env[t]];
                if (n.isFunction(r)) {
                    e = r;
                    break
                }
            }
            n.isFunction(e) && e.call(this)
        }
    })
}), define("text!template_widget_message", [], function () {
    return '<div class="message-floor" id="messageBox">\n  <div class="messge-box">\n    <div class="messge-box-icon"><i class="message-toast-icon {{cls}}"></i></div>\n    <div class="messge-box-content">{{{message}}}</div>\n  </div>\n</div>'
}), define("lehu.h5.widget.message", ["zepto", "can", "lehu.h5.business.config", "text!template_widget_message"], function (e, t, n, r) {
    return t.Control.extend({
        init: function (t, n) {
            this.data.height = n.height, this.data.width = n.width, this.data.cls = option.cls, this.data.message = n.message, this.data.duration = n.duration || 3e3, e("#messageBox").length == 0 && (this.render(), this.adjustHeight());
            var r = this;
            this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function () {
                e("#messageBox").style("display", "none"), r.data = null
            }, this.data.duration)
        }, render: function () {
            this.setup(e("body"));
            var n = t.mustache(r);
            this.options.html = n(this.data), e("body").append(this.options.html)
        }, adjustHeight: function () {
            e("#messageBox").find(".messge-box")[0].style.marginTop = (document.documentElement.clientHeight - this.data.height) / 2 + "px", e("#messageBox").find(".messge-box").width(this.data.width + "px"), e("#messageBox").find(".messge-box").height(this.data.height + "px"), e("#messageBox").style("display", "block")
        }
    })
}), require(["lehu.h5.framework.global"]);