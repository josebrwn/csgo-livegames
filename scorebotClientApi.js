! function e(t, n, r) {
    function o(s, a) {
        if (!n[s]) {
            if (!t[s]) {
                var c = "function" == typeof require && require;
                if (!a && c) return c(s, !0);
                if (i) return i(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var f = n[s] = {
                exports: {}
            };
            t[s][0].call(f.exports, function(e) {
                var n = t[s][1][e];
                return o(n || e)
            }, f, f.exports, e, t, n, r)
        }
        return n[s].exports
    }
    for (var i = "function" == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
    return o
}({
    1: [function(e, t, n) {
        function r(e, t, n) {
            function r(e, o) {
                if (r.count <= 0) throw new Error("after called too many times");
                --r.count, e ? (i = !0, t(e), t = n) : 0 !== r.count || i || t(null, o)
            }
            var i = !1;
            return n = n || o, r.count = e, 0 === e ? t() : r
        }

        function o() {}
        t.exports = r
    }, {}],
    2: [function(e, t, n) {
        t.exports = function(e, t, n) {
            var r = e.byteLength;
            if (t = t || 0, n = n || r, e.slice) return e.slice(t, n);
            if (t < 0 && (t += r), n < 0 && (n += r), n > r && (n = r), t >= r || t >= n || 0 === r) return new ArrayBuffer(0);
            for (var o = new Uint8Array(e), i = new Uint8Array(n - t), s = t, a = 0; s < n; s++, a++) i[a] = o[s];
            return i.buffer
        }
    }, {}],
    3: [function(e, t, n) {
        function r(e) {
            e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
        }
        t.exports = r, r.prototype.duration = function() {
            var e = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var t = Math.random(),
                    n = Math.floor(t * this.jitter * e);
                e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
            }
            return 0 | Math.min(e, this.max)
        }, r.prototype.reset = function() {
            this.attempts = 0
        }, r.prototype.setMin = function(e) {
            this.ms = e
        }, r.prototype.setMax = function(e) {
            this.max = e
        }, r.prototype.setJitter = function(e) {
            this.jitter = e
        }
    }, {}],
    4: [function(e, t, n) {
        ! function() {
            "use strict";
            for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = new Uint8Array(256), r = 0; r < e.length; r++) t[e.charCodeAt(r)] = r;
            n.encode = function(t) {
                var n, r = new Uint8Array(t),
                    o = r.length,
                    i = "";
                for (n = 0; n < o; n += 3) i += e[r[n] >> 2], i += e[(3 & r[n]) << 4 | r[n + 1] >> 4], i += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], i += e[63 & r[n + 2]];
                return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
            }, n.decode = function(e) {
                var n, r, o, i, s, a = .75 * e.length,
                    c = e.length,
                    u = 0;
                "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                var f = new ArrayBuffer(a),
                    h = new Uint8Array(f);
                for (n = 0; n < c; n += 4) r = t[e.charCodeAt(n)], o = t[e.charCodeAt(n + 1)], i = t[e.charCodeAt(n + 2)], s = t[e.charCodeAt(n + 3)], h[u++] = r << 2 | o >> 4, h[u++] = (15 & o) << 4 | i >> 2, h[u++] = (3 & i) << 6 | 63 & s;
                return f
            }
        }()
    }, {}],
    5: [function(e, t, n) {
        (function(e) {
            function n(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    if (n.buffer instanceof ArrayBuffer) {
                        var r = n.buffer;
                        if (n.byteLength !== r.byteLength) {
                            var o = new Uint8Array(n.byteLength);
                            o.set(new Uint8Array(r, n.byteOffset, n.byteLength)), r = o.buffer
                        }
                        e[t] = r
                    }
                }
            }

            function r(e, t) {
                t = t || {};
                var r = new i;
                n(e);
                for (var o = 0; o < e.length; o++) r.append(e[o]);
                return t.type ? r.getBlob(t.type) : r.getBlob()
            }

            function o(e, t) {
                return n(e), new Blob(e, t || {})
            }
            var i = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
                s = function() {
                    try {
                        return 2 === new Blob(["hi"]).size
                    } catch (e) {
                        return !1
                    }
                }(),
                a = s && function() {
                    try {
                        return 2 === new Blob([new Uint8Array([1, 2])]).size
                    } catch (e) {
                        return !1
                    }
                }(),
                c = i && i.prototype.append && i.prototype.getBlob;
            t.exports = function() {
                return s ? a ? e.Blob : o : c ? r : void 0
            }()
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    6: [function(e, t, n) {}, {}],
    7: [function(e, t, n) {
        var r = [].slice;
        t.exports = function(e, t) {
            if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
            var n = r.call(arguments, 2);
            return function() {
                return t.apply(e, n.concat(r.call(arguments)))
            }
        }
    }, {}],
    8: [function(e, t, n) {
        function r(e) {
            if (e) return o(e)
        }

        function o(e) {
            for (var t in r.prototype) e[t] = r.prototype[t];
            return e
        }
        void 0 !== t && (t.exports = r), r.prototype.on = r.prototype.addEventListener = function(e, t) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
        }, r.prototype.once = function(e, t) {
            function n() {
                this.off(e, n), t.apply(this, arguments)
            }
            return n.fn = t, this.on(e, n), this
        }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
            var n = this._callbacks["$" + e];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + e], this;
            for (var r, o = 0; o < n.length; o++)
                if ((r = n[o]) === t || r.fn === t) {
                    n.splice(o, 1);
                    break
                }
            return this
        }, r.prototype.emit = function(e) {
            this._callbacks = this._callbacks || {};
            var t = [].slice.call(arguments, 1),
                n = this._callbacks["$" + e];
            if (n) {
                n = n.slice(0);
                for (var r = 0, o = n.length; r < o; ++r) n[r].apply(this, t)
            }
            return this
        }, r.prototype.listeners = function(e) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
        }, r.prototype.hasListeners = function(e) {
            return !!this.listeners(e).length
        }
    }, {}],
    9: [function(e, t, n) {
        t.exports = function(e, t) {
            var n = function() {};
            n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
        }
    }, {}],
    10: [function(e, t, n) {
        (function(r) {
            function o() {
                return "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function i() {
                var e = arguments,
                    t = this.useColors;
                if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !t) return e;
                var r = "color: " + this.color;
                e = [e[0], r, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
                var o = 0,
                    i = 0;
                return e[0].replace(/%[a-z%]/g, function(e) {
                    "%%" !== e && (o++, "%c" === e && (i = o))
                }), e.splice(i, 0, r), e
            }

            function s() {
                return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function a(e) {
                try {
                    null == e ? n.storage.removeItem("debug") : n.storage.debug = e
                } catch (e) {}
            }

            function c() {
                try {
                    return n.storage.debug
                } catch (e) {}
                if (void 0 !== r && "env" in r) return r.env.DEBUG
            }
            n = t.exports = e("./debug"), n.log = s, n.formatArgs = i, n.save = a, n.load = c, n.useColors = o, n.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
                try {
                    return window.localStorage
                } catch (e) {}
            }(), n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function(e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return "[UnexpectedJSONParseError]: " + e.message
                }
            }, n.enable(c())
        }).call(this, e("_process"))
    }, {
        "./debug": 11,
        _process: 33
    }],
    11: [function(e, t, n) {
        function r() {
            return n.colors[f++ % n.colors.length]
        }

        function o(e) {
            function t() {}

            function o() {
                var e = o,
                    t = +new Date,
                    i = t - (u || t);
                e.diff = i, e.prev = u, e.curr = t, u = t, null == e.useColors && (e.useColors = n.useColors()), null == e.color && e.useColors && (e.color = r());
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                s[0] = n.coerce(s[0]), "string" != typeof s[0] && (s = ["%o"].concat(s));
                var c = 0;
                s[0] = s[0].replace(/%([a-z%])/g, function(t, r) {
                    if ("%%" === t) return t;
                    c++;
                    var o = n.formatters[r];
                    if ("function" == typeof o) {
                        var i = s[c];
                        t = o.call(e, i), s.splice(c, 1), c--
                    }
                    return t
                }), s = n.formatArgs.apply(e, s), (o.log || n.log || console.log.bind(console)).apply(e, s)
            }
            t.enabled = !1, o.enabled = !0;
            var i = n.enabled(e) ? o : t;
            return i.namespace = e, i
        }

        function i(e) {
            n.save(e);
            for (var t = (e || "").split(/[\s,]+/), r = t.length, o = 0; o < r; o++) t[o] && (e = t[o].replace(/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")))
        }

        function s() {
            n.enable("")
        }

        function a(e) {
            var t, r;
            for (t = 0, r = n.skips.length; t < r; t++)
                if (n.skips[t].test(e)) return !1;
            for (t = 0, r = n.names.length; t < r; t++)
                if (n.names[t].test(e)) return !0;
            return !1
        }

        function c(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        n = t.exports = o.debug = o, n.coerce = c, n.disable = s, n.enable = i, n.enabled = a, n.humanize = e("ms"), n.names = [], n.skips = [], n.formatters = {};
        var u, f = 0
    }, {
        ms: 29
    }],
    12: [function(e, t, n) {
        t.exports = e("./lib/index")
    }, {
        "./lib/index": 13
    }],
    13: [function(e, t, n) {
        t.exports = e("./socket"), t.exports.parser = e("engine.io-parser")
    }, {
        "./socket": 14,
        "engine.io-parser": 22
    }],
    14: [function(e, t, n) {
        (function(n) {
            function r(e, t) {
                if (!(this instanceof r)) return new r(e, t);
                t = t || {}, e && "object" == typeof e && (t = e, e = null), e ? (e = f(e), t.hostname = e.host, t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = f(t.host).host), this.secure = null != t.secure ? t.secure : n.location && "https:" === location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, this.hostname = t.hostname || (n.location ? location.hostname : "localhost"), this.port = t.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = p.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = void 0 === t.rejectUnauthorized ? null : t.rejectUnauthorized, this.forceNode = !!t.forceNode;
                var o = "object" == typeof n && n;
                o.global === o && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
            }

            function o(e) {
                var t = {};
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            }
            var i = e("./transports/index"),
                s = e("component-emitter"),
                a = e("debug")("engine.io-client:socket"),
                c = e("indexof"),
                u = e("engine.io-parser"),
                f = e("parseuri"),
                h = e("parsejson"),
                p = e("parseqs");
            t.exports = r, r.priorWebsocketSuccess = !1, s(r.prototype), r.protocol = u.protocol, r.Socket = r, r.Transport = e("./transport"), r.transports = e("./transports/index"), r.parser = e("engine.io-parser"), r.prototype.createTransport = function(e) {
                a('creating transport "%s"', e);
                var t = o(this.query);
                return t.EIO = u.protocol, t.transport = e, this.id && (t.sid = this.id), new i[e]({
                    agent: this.agent,
                    hostname: this.hostname,
                    port: this.port,
                    secure: this.secure,
                    path: this.path,
                    query: t,
                    forceJSONP: this.forceJSONP,
                    jsonp: this.jsonp,
                    forceBase64: this.forceBase64,
                    enablesXDR: this.enablesXDR,
                    timestampRequests: this.timestampRequests,
                    timestampParam: this.timestampParam,
                    policyPort: this.policyPort,
                    socket: this,
                    pfx: this.pfx,
                    key: this.key,
                    passphrase: this.passphrase,
                    cert: this.cert,
                    ca: this.ca,
                    ciphers: this.ciphers,
                    rejectUnauthorized: this.rejectUnauthorized,
                    perMessageDeflate: this.perMessageDeflate,
                    extraHeaders: this.extraHeaders,
                    forceNode: this.forceNode,
                    localAddress: this.localAddress
                })
            }, r.prototype.open = function() {
                var e;
                if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";
                else {
                    if (0 === this.transports.length) {
                        var t = this;
                        return void setTimeout(function() {
                            t.emit("error", "No transports available")
                        }, 0)
                    }
                    e = this.transports[0]
                }
                this.readyState = "opening";
                try {
                    e = this.createTransport(e)
                } catch (e) {
                    return this.transports.shift(), void this.open()
                }
                e.open(), this.setTransport(e)
            }, r.prototype.setTransport = function(e) {
                a("setting transport %s", e.name);
                var t = this;
                this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", function() {
                    t.onDrain()
                }).on("packet", function(e) {
                    t.onPacket(e)
                }).on("error", function(e) {
                    t.onError(e)
                }).on("close", function() {
                    t.onClose("transport close")
                })
            }, r.prototype.probe = function(e) {
                function t() {
                    if (p.onlyBinaryUpgrades) {
                        var t = !this.supportsBinary && p.transport.supportsBinary;
                        h = h || t
                    }
                    h || (a('probe transport "%s" opened', e), f.send([{
                        type: "ping",
                        data: "probe"
                    }]), f.once("packet", function(t) {
                        if (!h)
                            if ("pong" === t.type && "probe" === t.data) {
                                if (a('probe transport "%s" pong', e), p.upgrading = !0, p.emit("upgrading", f), !f) return;
                                r.priorWebsocketSuccess = "websocket" === f.name, a('pausing current transport "%s"', p.transport.name), p.transport.pause(function() {
                                    h || "closed" !== p.readyState && (a("changing transport and sending upgrade packet"), u(), p.setTransport(f), f.send([{
                                        type: "upgrade"
                                    }]), p.emit("upgrade", f), f = null, p.upgrading = !1, p.flush())
                                })
                            } else {
                                a('probe transport "%s" failed', e);
                                var n = new Error("probe error");
                                n.transport = f.name, p.emit("upgradeError", n)
                            }
                    }))
                }

                function n() {
                    h || (h = !0, u(), f.close(), f = null)
                }

                function o(t) {
                    var r = new Error("probe error: " + t);
                    r.transport = f.name, n(), a('probe transport "%s" failed because of error: %s', e, t), p.emit("upgradeError", r)
                }

                function i() {
                    o("transport closed")
                }

                function s() {
                    o("socket closed")
                }

                function c(e) {
                    f && e.name !== f.name && (a('"%s" works - aborting "%s"', e.name, f.name), n())
                }

                function u() {
                    f.removeListener("open", t), f.removeListener("error", o), f.removeListener("close", i), p.removeListener("close", s), p.removeListener("upgrading", c)
                }
                a('probing transport "%s"', e);
                var f = this.createTransport(e, {
                        probe: 1
                    }),
                    h = !1,
                    p = this;
                r.priorWebsocketSuccess = !1, f.once("open", t), f.once("error", o), f.once("close", i), this.once("close", s), this.once("upgrading", c), f.open()
            }, r.prototype.onOpen = function() {
                if (a("socket open"), this.readyState = "open", r.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
                    a("starting upgrade probes");
                    for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e])
                }
            }, r.prototype.onPacket = function(e) {
                if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (a('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
                    case "open":
                        this.onHandshake(h(e.data));
                        break;
                    case "pong":
                        this.setPing(), this.emit("pong");
                        break;
                    case "error":
                        var t = new Error("server error");
                        t.code = e.data, this.onError(t);
                        break;
                    case "message":
                        this.emit("data", e.data), this.emit("message", e.data)
                } else a('packet received with socket readyState "%s"', this.readyState)
            }, r.prototype.onHandshake = function(e) {
                this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
            }, r.prototype.onHeartbeat = function(e) {
                clearTimeout(this.pingTimeoutTimer);
                var t = this;
                t.pingTimeoutTimer = setTimeout(function() {
                    "closed" !== t.readyState && t.onClose("ping timeout")
                }, e || t.pingInterval + t.pingTimeout)
            }, r.prototype.setPing = function() {
                var e = this;
                clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function() {
                    a("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout)
                }, e.pingInterval)
            }, r.prototype.ping = function() {
                var e = this;
                this.sendPacket("ping", function() {
                    e.emit("ping")
                })
            }, r.prototype.onDrain = function() {
                this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
            }, r.prototype.flush = function() {
                "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
            }, r.prototype.write = r.prototype.send = function(e, t, n) {
                return this.sendPacket("message", e, t, n), this
            }, r.prototype.sendPacket = function(e, t, n, r) {
                if ("function" == typeof t && (r = t, t = void 0), "function" == typeof n && (r = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                    n = n || {}, n.compress = !1 !== n.compress;
                    var o = {
                        type: e,
                        data: t,
                        options: n
                    };
                    this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), this.flush()
                }
            }, r.prototype.close = function() {
                function e() {
                    r.onClose("forced close"), a("socket closing - telling transport to close"), r.transport.close()
                }

                function t() {
                    r.removeListener("upgrade", t), r.removeListener("upgradeError", t), e()
                }

                function n() {
                    r.once("upgrade", t), r.once("upgradeError", t)
                }
                if ("opening" === this.readyState || "open" === this.readyState) {
                    this.readyState = "closing";
                    var r = this;
                    this.writeBuffer.length ? this.once("drain", function() {
                        this.upgrading ? n() : e()
                    }) : this.upgrading ? n() : e()
                }
                return this
            }, r.prototype.onError = function(e) {
                a("socket error %j", e), r.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e)
            }, r.prototype.onClose = function(e, t) {
                if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                    a('socket close with reason: "%s"', e);
                    var n = this;
                    clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t), n.writeBuffer = [], n.prevBufferLen = 0
                }
            }, r.prototype.filterUpgrades = function(e) {
                for (var t = [], n = 0, r = e.length; n < r; n++) ~c(this.transports, e[n]) && t.push(e[n]);
                return t
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./transport": 15,
        "./transports/index": 16,
        "component-emitter": 8,
        debug: 10,
        "engine.io-parser": 22,
        indexof: 26,
        parsejson: 30,
        parseqs: 31,
        parseuri: 32
    }],
    15: [function(e, t, n) {
        function r(e) {
            this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.forceNode = e.forceNode, this.extraHeaders = e.extraHeaders, this.localAddress = e.localAddress
        }
        var o = e("engine.io-parser"),
            i = e("component-emitter");
        t.exports = r, i(r.prototype), r.prototype.onError = function(e, t) {
            var n = new Error(e);
            return n.type = "TransportError", n.description = t, this.emit("error", n), this
        }, r.prototype.open = function() {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
        }, r.prototype.close = function() {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
        }, r.prototype.send = function(e) {
            if ("open" !== this.readyState) throw new Error("Transport not open");
            this.write(e)
        }, r.prototype.onOpen = function() {
            this.readyState = "open", this.writable = !0, this.emit("open")
        }, r.prototype.onData = function(e) {
            var t = o.decodePacket(e, this.socket.binaryType);
            this.onPacket(t)
        }, r.prototype.onPacket = function(e) {
            this.emit("packet", e)
        }, r.prototype.onClose = function() {
            this.readyState = "closed", this.emit("close")
        }
    }, {
        "component-emitter": 8,
        "engine.io-parser": 22
    }],
    16: [function(e, t, n) {
        (function(t) {
            function r(e) {
                var n = !1,
                    r = !1,
                    a = !1 !== e.jsonp;
                if (t.location) {
                    var c = "https:" === location.protocol,
                        u = location.port;
                    u || (u = c ? 443 : 80), n = e.hostname !== location.hostname || u !== e.port, r = e.secure !== c
                }
                if (e.xdomain = n, e.xscheme = r, "open" in new o(e) && !e.forceJSONP) return new i(e);
                if (!a) throw new Error("JSONP disabled");
                return new s(e)
            }
            var o = e("xmlhttprequest-ssl"),
                i = e("./polling-xhr"),
                s = e("./polling-jsonp"),
                a = e("./websocket");
            n.polling = r, n.websocket = a
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./polling-jsonp": 17,
        "./polling-xhr": 18,
        "./websocket": 20,
        "xmlhttprequest-ssl": 21
    }],
    17: [function(e, t, n) {
        (function(n) {
            function r() {}

            function o(e) {
                i.call(this, e), this.query = this.query || {}, a || (n.___eio || (n.___eio = []), a = n.___eio), this.index = a.length;
                var t = this;
                a.push(function(e) {
                    t.onData(e)
                }), this.query.j = this.index, n.document && n.addEventListener && n.addEventListener("beforeunload", function() {
                    t.script && (t.script.onerror = r)
                }, !1)
            }
            var i = e("./polling"),
                s = e("component-inherit");
            t.exports = o;
            var a, c = /\n/g,
                u = /\\n/g;
            s(o, i), o.prototype.supportsBinary = !1, o.prototype.doClose = function() {
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), i.prototype.doClose.call(this)
            }, o.prototype.doPoll = function() {
                var e = this,
                    t = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function(t) {
                    e.onError("jsonp poll error", t)
                };
                var n = document.getElementsByTagName("script")[0];
                n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t), this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                    var e = document.createElement("iframe");
                    document.body.appendChild(e), document.body.removeChild(e)
                }, 100)
            }, o.prototype.doWrite = function(e, t) {
                function n() {
                    r(), t()
                }

                function r() {
                    if (o.iframe) try {
                        o.form.removeChild(o.iframe)
                    } catch (e) {
                        o.onError("jsonp polling iframe removal error", e)
                    }
                    try {
                        var e = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                        i = document.createElement(e)
                    } catch (e) {
                        i = document.createElement("iframe"), i.name = o.iframeId, i.src = "javascript:0"
                    }
                    i.id = o.iframeId, o.form.appendChild(i), o.iframe = i
                }
                var o = this;
                if (!this.form) {
                    var i, s = document.createElement("form"),
                        a = document.createElement("textarea"),
                        f = this.iframeId = "eio_iframe_" + this.index;
                    s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px", s.target = f, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), a.name = "d", s.appendChild(a), document.body.appendChild(s), this.form = s, this.area = a
                }
                this.form.action = this.uri(), r(), e = e.replace(u, "\\\n"), this.area.value = e.replace(c, "\\n");
                try {
                    this.form.submit()
                } catch (e) {}
                this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                    "complete" === o.iframe.readyState && n()
                } : this.iframe.onload = n
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./polling": 19,
        "component-inherit": 9
    }],
    18: [function(e, t, n) {
        (function(n) {
            function r() {}

            function o(e) {
                if (c.call(this, e), this.requestTimeout = e.requestTimeout, n.location) {
                    var t = "https:" === location.protocol,
                        r = location.port;
                    r || (r = t ? 443 : 80), this.xd = e.hostname !== n.location.hostname || r !== e.port, this.xs = e.secure !== t
                } else this.extraHeaders = e.extraHeaders
            }

            function i(e) {
                this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.requestTimeout = e.requestTimeout, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders, this.create()
            }

            function s() {
                for (var e in i.requests) i.requests.hasOwnProperty(e) && i.requests[e].abort()
            }
            var a = e("xmlhttprequest-ssl"),
                c = e("./polling"),
                u = e("component-emitter"),
                f = e("component-inherit"),
                h = e("debug")("engine.io-client:polling-xhr");
            t.exports = o, t.exports.Request = i, f(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function(e) {
                return e = e || {}, e.uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new i(e)
            }, o.prototype.doWrite = function(e, t) {
                var n = "string" != typeof e && void 0 !== e,
                    r = this.request({
                        method: "POST",
                        data: e,
                        isBinary: n
                    }),
                    o = this;
                r.on("success", t), r.on("error", function(e) {
                    o.onError("xhr post error", e)
                }), this.sendXhr = r
            }, o.prototype.doPoll = function() {
                h("xhr poll");
                var e = this.request(),
                    t = this;
                e.on("data", function(e) {
                    t.onData(e)
                }), e.on("error", function(e) {
                    t.onError("xhr poll error", e)
                }), this.pollXhr = e
            }, u(i.prototype), i.prototype.create = function() {
                var e = {
                    agent: this.agent,
                    xdomain: this.xd,
                    xscheme: this.xs,
                    enablesXDR: this.enablesXDR
                };
                e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
                var t = this.xhr = new a(e),
                    r = this;
                try {
                    h("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
                    try {
                        if (this.extraHeaders) {
                            t.setDisableHeaderCheck(!0);
                            for (var o in this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && t.setRequestHeader(o, this.extraHeaders[o])
                        }
                    } catch (e) {}
                    if (this.supportsBinary && (t.responseType = "arraybuffer"), "POST" === this.method) try {
                        this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                    } catch (e) {}
                    try {
                        t.setRequestHeader("Accept", "*/*")
                    } catch (e) {}
                    "withCredentials" in t && (t.withCredentials = !0), this.requestTimeout && (t.timeout = this.requestTimeout), this.hasXDR() ? (t.onload = function() {
                        r.onLoad()
                    }, t.onerror = function() {
                        r.onError(t.responseText)
                    }) : t.onreadystatechange = function() {
                        4 === t.readyState && (200 === t.status || 1223 === t.status ? r.onLoad() : setTimeout(function() {
                            r.onError(t.status)
                        }, 0))
                    }, h("xhr data %s", this.data), t.send(this.data)
                } catch (e) {
                    return void setTimeout(function() {
                        r.onError(e)
                    }, 0)
                }
                n.document && (this.index = i.requestsCount++, i.requests[this.index] = this)
            }, i.prototype.onSuccess = function() {
                this.emit("success"), this.cleanup()
            }, i.prototype.onData = function(e) {
                this.emit("data", e), this.onSuccess()
            }, i.prototype.onError = function(e) {
                this.emit("error", e), this.cleanup(!0)
            }, i.prototype.cleanup = function(e) {
                if (void 0 !== this.xhr && null !== this.xhr) {
                    if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r, e) try {
                        this.xhr.abort()
                    } catch (e) {}
                    n.document && delete i.requests[this.index], this.xhr = null
                }
            }, i.prototype.onLoad = function() {
                var e;
                try {
                    var t;
                    try {
                        t = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                    } catch (e) {}
                    if ("application/octet-stream" === t) e = this.xhr.response || this.xhr.responseText;
                    else if (this.supportsBinary) try {
                        e = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                    } catch (t) {
                        for (var n = new Uint8Array(this.xhr.response), r = [], o = 0, i = n.length; o < i; o++) r.push(n[o]);
                        e = String.fromCharCode.apply(null, r)
                    } else e = this.xhr.responseText
                } catch (e) {
                    this.onError(e)
                }
                null != e && this.onData(e)
            }, i.prototype.hasXDR = function() {
                return void 0 !== n.XDomainRequest && !this.xs && this.enablesXDR
            }, i.prototype.abort = function() {
                this.cleanup()
            }, i.requestsCount = 0, i.requests = {}, n.document && (n.attachEvent ? n.attachEvent("onunload", s) : n.addEventListener && n.addEventListener("beforeunload", s, !1))
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./polling": 19,
        "component-emitter": 8,
        "component-inherit": 9,
        debug: 10,
        "xmlhttprequest-ssl": 21
    }],
    19: [function(e, t, n) {
        function r(e) {
            var t = e && e.forceBase64;
            f && !t || (this.supportsBinary = !1), o.call(this, e)
        }
        var o = e("../transport"),
            i = e("parseqs"),
            s = e("engine.io-parser"),
            a = e("component-inherit"),
            c = e("yeast"),
            u = e("debug")("engine.io-client:polling");
        t.exports = r;
        var f = function() {
            return null != new(e("xmlhttprequest-ssl"))({
                xdomain: !1
            }).responseType
        }();
        a(r, o), r.prototype.name = "polling", r.prototype.doOpen = function() {
            this.poll()
        }, r.prototype.pause = function(e) {
            function t() {
                u("paused"), n.readyState = "paused", e()
            }
            var n = this;
            if (this.readyState = "pausing", this.polling || !this.writable) {
                var r = 0;
                this.polling && (u("we are currently polling - waiting to pause"), r++, this.once("pollComplete", function() {
                    u("pre-pause polling complete"), --r || t()
                })), this.writable || (u("we are currently writing - waiting to pause"), r++, this.once("drain", function() {
                    u("pre-pause writing complete"), --r || t()
                }))
            } else t()
        }, r.prototype.poll = function() {
            u("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
        }, r.prototype.onData = function(e) {
            var t = this;
            u("polling got data %s", e);
            var n = function(e, n, r) {
                if ("opening" === t.readyState && t.onOpen(), "close" === e.type) return t.onClose(), !1;
                t.onPacket(e)
            };
            s.decodePayload(e, this.socket.binaryType, n), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : u('ignoring poll - transport state "%s"', this.readyState))
        }, r.prototype.doClose = function() {
            function e() {
                u("writing close packet"), t.write([{
                    type: "close"
                }])
            }
            var t = this;
            "open" === this.readyState ? (u("transport open - closing"), e()) : (u("transport not open - deferring close"), this.once("open", e))
        }, r.prototype.write = function(e) {
            var t = this;
            this.writable = !1;
            var n = function() {
                t.writable = !0, t.emit("drain")
            };
            s.encodePayload(e, this.supportsBinary, function(e) {
                t.doWrite(e, n)
            })
        }, r.prototype.uri = function() {
            var e = this.query || {},
                t = this.secure ? "https" : "http",
                n = "";
            return !1 !== this.timestampRequests && (e[this.timestampParam] = c()), this.supportsBinary || e.sid || (e.b64 = 1), e = i.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (n = ":" + this.port), e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e
        }
    }, {
        "../transport": 15,
        "component-inherit": 9,
        debug: 10,
        "engine.io-parser": 22,
        parseqs: 31,
        "xmlhttprequest-ssl": 21,
        yeast: 48
    }],
    20: [function(e, t, n) {
        (function(n) {
            function r(e) {
                e && e.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, this.usingBrowserWebSocket = h && !e.forceNode, this.usingBrowserWebSocket || (p = o), i.call(this, e)
            }
            var o, i = e("../transport"),
                s = e("engine.io-parser"),
                a = e("parseqs"),
                c = e("component-inherit"),
                u = e("yeast"),
                f = e("debug")("engine.io-client:websocket"),
                h = n.WebSocket || n.MozWebSocket;
            if ("undefined" == typeof window) try {
                o = e("ws")
            } catch (e) {}
            var p = h;
            p || "undefined" != typeof window || (p = o), t.exports = r, c(r, i), r.prototype.name = "websocket", r.prototype.supportsBinary = !0, r.prototype.doOpen = function() {
                if (this.check()) {
                    var e = this.uri(),
                        t = {
                            agent: this.agent,
                            perMessageDeflate: this.perMessageDeflate
                        };
                    t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (t.headers = this.extraHeaders), this.localAddress && (t.localAddress = this.localAddress);
                    try {
                        this.ws = this.usingBrowserWebSocket ? new p(e) : new p(e, void 0, t)
                    } catch (e) {
                        return this.emit("error", e)
                    }
                    void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
                }
            }, r.prototype.addEventListeners = function() {
                var e = this;
                this.ws.onopen = function() {
                    e.onOpen()
                }, this.ws.onclose = function() {
                    e.onClose()
                }, this.ws.onmessage = function(t) {
                    e.onData(t.data)
                }, this.ws.onerror = function(t) {
                    e.onError("websocket error", t)
                }
            }, r.prototype.write = function(e) {
                function t() {
                    r.emit("flush"), setTimeout(function() {
                        r.writable = !0, r.emit("drain")
                    }, 0)
                }
                var r = this;
                this.writable = !1;
                for (var o = e.length, i = 0, a = o; i < a; i++) ! function(e) {
                    s.encodePacket(e, r.supportsBinary, function(i) {
                        if (!r.usingBrowserWebSocket) {
                            var s = {};
                            if (e.options && (s.compress = e.options.compress), r.perMessageDeflate) {
                                ("string" == typeof i ? n.Buffer.byteLength(i) : i.length) < r.perMessageDeflate.threshold && (s.compress = !1)
                            }
                        }
                        try {
                            r.usingBrowserWebSocket ? r.ws.send(i) : r.ws.send(i, s)
                        } catch (e) {
                            f("websocket closed before onclose event")
                        }--o || t()
                    })
                }(e[i])
            }, r.prototype.onClose = function() {
                i.prototype.onClose.call(this)
            }, r.prototype.doClose = function() {
                void 0 !== this.ws && this.ws.close()
            }, r.prototype.uri = function() {
                var e = this.query || {},
                    t = this.secure ? "wss" : "ws",
                    n = "";
                return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (n = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = u()), this.supportsBinary || (e.b64 = 1), e = a.encode(e), e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e
            }, r.prototype.check = function() {
                return !(!p || "__initialize" in p && this.name === r.prototype.name)
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "../transport": 15,
        "component-inherit": 9,
        debug: 10,
        "engine.io-parser": 22,
        parseqs: 31,
        ws: 6,
        yeast: 48
    }],
    21: [function(e, t, n) {
        (function(n) {
            var r = e("has-cors");
            t.exports = function(e) {
                var t = e.xdomain,
                    o = e.xscheme,
                    i = e.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!t || r)) return new XMLHttpRequest
                } catch (e) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !o && i) return new XDomainRequest
                } catch (e) {}
                if (!t) try {
                    return new(n[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                } catch (e) {}
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "has-cors": 25
    }],
    22: [function(e, t, n) {
        (function(t) {
            function r(e, t) {
                return t("b" + n.packets[e.type] + e.data.data)
            }

            function o(e, t, r) {
                if (!t) return n.encodeBase64Packet(e, r);
                var o = e.data,
                    i = new Uint8Array(o),
                    s = new Uint8Array(1 + o.byteLength);
                s[0] = v[e.type];
                for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
                return r(s.buffer)
            }

            function i(e, t, r) {
                if (!t) return n.encodeBase64Packet(e, r);
                var o = new FileReader;
                return o.onload = function() {
                    e.data = o.result, n.encodePacket(e, t, !0, r)
                }, o.readAsArrayBuffer(e.data)
            }

            function s(e, t, r) {
                if (!t) return n.encodeBase64Packet(e, r);
                if (m) return i(e, t, r);
                var o = new Uint8Array(1);
                return o[0] = v[e.type], r(new w([o.buffer, e.data]))
            }

            function a(e) {
                try {
                    e = d.decode(e)
                } catch (e) {
                    return !1
                }
                return e
            }

            function c(e, t, n) {
                for (var r = new Array(e.length), o = l(e.length, n), i = 0; i < e.length; i++) ! function(e, n, o) {
                    t(n, function(t, n) {
                        r[e] = n, o(t, r)
                    })
                }(i, e[i], o)
            }
            var u, f = e("./keys"),
                h = e("has-binary"),
                p = e("arraybuffer.slice"),
                l = e("after"),
                d = e("wtf-8");
            t && t.ArrayBuffer && (u = e("base64-arraybuffer"));
            var y = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
                g = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
                m = y || g;
            n.protocol = 3;
            var v = n.packets = {
                    open: 0,
                    close: 1,
                    ping: 2,
                    pong: 3,
                    message: 4,
                    upgrade: 5,
                    noop: 6
                },
                b = f(v),
                k = {
                    type: "error",
                    data: "parser error"
                },
                w = e("blob");
            n.encodePacket = function(e, n, i, a) {
                "function" == typeof n && (a = n, n = !1), "function" == typeof i && (a = i, i = null);
                var c = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                if (t.ArrayBuffer && c instanceof ArrayBuffer) return o(e, n, a);
                if (w && c instanceof t.Blob) return s(e, n, a);
                if (c && c.base64) return r(e, a);
                var u = v[e.type];
                return void 0 !== e.data && (u += i ? d.encode(String(e.data)) : String(e.data)), a("" + u)
            }, n.encodeBase64Packet = function(e, r) {
                var o = "b" + n.packets[e.type];
                if (w && e.data instanceof t.Blob) {
                    var i = new FileReader;
                    return i.onload = function() {
                        var e = i.result.split(",")[1];
                        r(o + e)
                    }, i.readAsDataURL(e.data)
                }
                var s;
                try {
                    s = String.fromCharCode.apply(null, new Uint8Array(e.data))
                } catch (t) {
                    for (var a = new Uint8Array(e.data), c = new Array(a.length), u = 0; u < a.length; u++) c[u] = a[u];
                    s = String.fromCharCode.apply(null, c)
                }
                return o += t.btoa(s), r(o)
            }, n.decodePacket = function(e, t, r) {
                if (void 0 === e) return k;
                if ("string" == typeof e) {
                    if ("b" == e.charAt(0)) return n.decodeBase64Packet(e.substr(1), t);
                    if (r && !1 === (e = a(e))) return k;
                    var o = e.charAt(0);
                    return Number(o) == o && b[o] ? e.length > 1 ? {
                        type: b[o],
                        data: e.substring(1)
                    } : {
                        type: b[o]
                    } : k
                }
                var i = new Uint8Array(e),
                    o = i[0],
                    s = p(e, 1);
                return w && "blob" === t && (s = new w([s])), {
                    type: b[o],
                    data: s
                }
            }, n.decodeBase64Packet = function(e, t) {
                var n = b[e.charAt(0)];
                if (!u) return {
                    type: n,
                    data: {
                        base64: !0,
                        data: e.substr(1)
                    }
                };
                var r = u.decode(e.substr(1));
                return "blob" === t && w && (r = new w([r])), {
                    type: n,
                    data: r
                }
            }, n.encodePayload = function(e, t, r) {
                function o(e) {
                    return e.length + ":" + e
                }

                function i(e, r) {
                    n.encodePacket(e, !!s && t, !0, function(e) {
                        r(null, o(e))
                    })
                }
                "function" == typeof t && (r = t, t = null);
                var s = h(e);
                return t && s ? w && !m ? n.encodePayloadAsBlob(e, r) : n.encodePayloadAsArrayBuffer(e, r) : e.length ? void c(e, i, function(e, t) {
                    return r(t.join(""))
                }) : r("0:")
            }, n.decodePayload = function(e, t, r) {
                if ("string" != typeof e) return n.decodePayloadAsBinary(e, t, r);
                "function" == typeof t && (r = t, t = null);
                var o;
                if ("" == e) return r(k, 0, 1);
                for (var i, s, a = "", c = 0, u = e.length; c < u; c++) {
                    var f = e.charAt(c);
                    if (":" != f) a += f;
                    else {
                        if ("" == a || a != (i = Number(a))) return r(k, 0, 1);
                        if (s = e.substr(c + 1, i), a != s.length) return r(k, 0, 1);
                        if (s.length) {
                            if (o = n.decodePacket(s, t, !0), k.type == o.type && k.data == o.data) return r(k, 0, 1);
                            if (!1 === r(o, c + i, u)) return
                        }
                        c += i, a = ""
                    }
                }
                return "" != a ? r(k, 0, 1) : void 0
            }, n.encodePayloadAsArrayBuffer = function(e, t) {
                function r(e, t) {
                    n.encodePacket(e, !0, !0, function(e) {
                        return t(null, e)
                    })
                }
                if (!e.length) return t(new ArrayBuffer(0));
                c(e, r, function(e, n) {
                    var r = n.reduce(function(e, t) {
                            var n;
                            return n = "string" == typeof t ? t.length : t.byteLength, e + n.toString().length + n + 2
                        }, 0),
                        o = new Uint8Array(r),
                        i = 0;
                    return n.forEach(function(e) {
                        var t = "string" == typeof e,
                            n = e;
                        if (t) {
                            for (var r = new Uint8Array(e.length), s = 0; s < e.length; s++) r[s] = e.charCodeAt(s);
                            n = r.buffer
                        }
                        o[i++] = t ? 0 : 1;
                        for (var a = n.byteLength.toString(), s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                        o[i++] = 255;
                        for (var r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s]
                    }), t(o.buffer)
                })
            }, n.encodePayloadAsBlob = function(e, t) {
                function r(e, t) {
                    n.encodePacket(e, !0, !0, function(e) {
                        var n = new Uint8Array(1);
                        if (n[0] = 1, "string" == typeof e) {
                            for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
                            e = r.buffer, n[0] = 0
                        }
                        for (var i = e instanceof ArrayBuffer ? e.byteLength : e.size, s = i.toString(), a = new Uint8Array(s.length + 1), o = 0; o < s.length; o++) a[o] = parseInt(s[o]);
                        if (a[s.length] = 255, w) {
                            var c = new w([n.buffer, a.buffer, e]);
                            t(null, c)
                        }
                    })
                }
                c(e, r, function(e, n) {
                    return t(new w(n))
                })
            }, n.decodePayloadAsBinary = function(e, t, r) {
                "function" == typeof t && (r = t, t = null);
                for (var o = e, i = [], s = !1; o.byteLength > 0;) {
                    for (var a = new Uint8Array(o), c = 0 === a[0], u = "", f = 1; 255 != a[f]; f++) {
                        if (u.length > 310) {
                            s = !0;
                            break
                        }
                        u += a[f]
                    }
                    if (s) return r(k, 0, 1);
                    o = p(o, 2 + u.length), u = parseInt(u);
                    var h = p(o, 0, u);
                    if (c) try {
                        h = String.fromCharCode.apply(null, new Uint8Array(h))
                    } catch (e) {
                        var l = new Uint8Array(h);
                        h = "";
                        for (var f = 0; f < l.length; f++) h += String.fromCharCode(l[f])
                    }
                    i.push(h), o = p(o, u)
                }
                var d = i.length;
                i.forEach(function(e, o) {
                    r(n.decodePacket(e, t, !0), o, d)
                })
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./keys": 23,
        after: 1,
        "arraybuffer.slice": 2,
        "base64-arraybuffer": 4,
        blob: 5,
        "has-binary": 24,
        "wtf-8": 47
    }],
    23: [function(e, t, n) {
        t.exports = Object.keys || function(e) {
            var t = [],
                n = Object.prototype.hasOwnProperty;
            for (var r in e) n.call(e, r) && t.push(r);
            return t
        }
    }, {}],
    24: [function(e, t, n) {
        (function(n) {
            function r(e) {
                function t(e) {
                    if (!e) return !1;
                    if (n.Buffer && n.Buffer.isBuffer && n.Buffer.isBuffer(e) || n.ArrayBuffer && e instanceof ArrayBuffer || n.Blob && e instanceof Blob || n.File && e instanceof File) return !0;
                    if (o(e)) {
                        for (var r = 0; r < e.length; r++)
                            if (t(e[r])) return !0
                    } else if (e && "object" == typeof e) {
                        e.toJSON && "function" == typeof e.toJSON && (e = e.toJSON());
                        for (var i in e)
                            if (Object.prototype.hasOwnProperty.call(e, i) && t(e[i])) return !0
                    }
                    return !1
                }
                return t(e)
            }
            var o = e("isarray");
            t.exports = r
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        isarray: 27
    }],
    25: [function(e, t, n) {
        try {
            t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
        } catch (e) {
            t.exports = !1
        }
    }, {}],
    26: [function(e, t, n) {
        var r = [].indexOf;
        t.exports = function(e, t) {
            if (r) return e.indexOf(t);
            for (var n = 0; n < e.length; ++n)
                if (e[n] === t) return n;
            return -1
        }
    }, {}],
    27: [function(e, t, n) {
        t.exports = Array.isArray || function(e) {
            return "[object Array]" == Object.prototype.toString.call(e)
        }
    }, {}],
    28: [function(e, t, n) {
        (function(e) {
            (function() {
                function r(e, t) {
                    function n(e) {
                        if (n[e] !== g) return n[e];
                        var r;
                        if ("bug-string-char-index" == e) r = "a" != "a" [0];
                        else if ("json" == e) r = n("json-stringify") && n("json-parse");
                        else {
                            var i, a = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                            if ("json-stringify" == e) {
                                var c = t.stringify,
                                    f = "function" == typeof c && b;
                                if (f) {
                                    (i = function() {
                                        return 1
                                    }).toJSON = i;
                                    try {
                                        f = "0" === c(0) && "0" === c(new o) && '""' == c(new s) && c(v) === g && c(g) === g && c() === g && "1" === c(i) && "[1]" == c([i]) && "[null]" == c([g]) && "null" == c(null) && "[null,null,null]" == c([g, v, null]) && c({
                                            a: [i, !0, !1, null, "\0\b\n\f\r\t"]
                                        }) == a && "1" === c(null, i) && "[\n 1,\n 2\n]" == c([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == c(new u(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == c(new u(864e13)) && '"-000001-01-01T00:00:00.000Z"' == c(new u(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == c(new u(-1))
                                    } catch (e) {
                                        f = !1
                                    }
                                }
                                r = f
                            }
                            if ("json-parse" == e) {
                                var h = t.parse;
                                if ("function" == typeof h) try {
                                    if (0 === h("0") && !h(!1)) {
                                        i = h(a);
                                        var p = 5 == i.a.length && 1 === i.a[0];
                                        if (p) {
                                            try {
                                                p = !h('"\t"')
                                            } catch (e) {}
                                            if (p) try {
                                                p = 1 !== h("01")
                                            } catch (e) {}
                                            if (p) try {
                                                p = 1 !== h("1.")
                                            } catch (e) {}
                                        }
                                    }
                                } catch (e) {
                                    p = !1
                                }
                                r = p
                            }
                        }
                        return n[e] = !!r
                    }
                    e || (e = a.Object()), t || (t = a.Object());
                    var o = e.Number || a.Number,
                        s = e.String || a.String,
                        c = e.Object || a.Object,
                        u = e.Date || a.Date,
                        f = e.SyntaxError || a.SyntaxError,
                        h = e.TypeError || a.TypeError,
                        p = e.Math || a.Math,
                        l = e.JSON || a.JSON;
                    "object" == typeof l && l && (t.stringify = l.stringify, t.parse = l.parse);
                    var d, y, g, m = c.prototype,
                        v = m.toString,
                        b = new u(-0xc782b5b800cec);
                    try {
                        b = -109252 == b.getUTCFullYear() && 0 === b.getUTCMonth() && 1 === b.getUTCDate() && 10 == b.getUTCHours() && 37 == b.getUTCMinutes() && 6 == b.getUTCSeconds() && 708 == b.getUTCMilliseconds()
                    } catch (e) {}
                    if (!n("json")) {
                        var k = n("bug-string-char-index");
                        if (!b) var w = p.floor,
                            S = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                            x = function(e, t) {
                                return S[t] + 365 * (e - 1970) + w((e - 1969 + (t = +(t > 1))) / 4) - w((e - 1901 + t) / 100) + w((e - 1601 + t) / 400)
                            };
                        if ((d = m.hasOwnProperty) || (d = function(e) {
                                var t, n = {};
                                return (n.__proto__ = null, n.__proto__ = {
                                    toString: 1
                                }, n).toString != v ? d = function(e) {
                                    var t = this.__proto__,
                                        n = e in (this.__proto__ = null, this);
                                    return this.__proto__ = t, n
                                } : (t = n.constructor, d = function(e) {
                                    var n = (this.constructor || t).prototype;
                                    return e in this && !(e in n && this[e] === n[e])
                                }), n = null, d.call(this, e)
                            }), y = function(e, t) {
                                var n, r, o, s = 0;
                                (n = function() {
                                    this.valueOf = 0
                                }).prototype.valueOf = 0, r = new n;
                                for (o in r) d.call(r, o) && s++;
                                return n = r = null, s ? y = 2 == s ? function(e, t) {
                                    var n, r = {},
                                        o = "[object Function]" == v.call(e);
                                    for (n in e) o && "prototype" == n || d.call(r, n) || !(r[n] = 1) || !d.call(e, n) || t(n)
                                } : function(e, t) {
                                    var n, r, o = "[object Function]" == v.call(e);
                                    for (n in e) o && "prototype" == n || !d.call(e, n) || (r = "constructor" === n) || t(n);
                                    (r || d.call(e, n = "constructor")) && t(n)
                                } : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], y = function(e, t) {
                                    var n, o, s = "[object Function]" == v.call(e),
                                        a = !s && "function" != typeof e.constructor && i[typeof e.hasOwnProperty] && e.hasOwnProperty || d;
                                    for (n in e) s && "prototype" == n || !a.call(e, n) || t(n);
                                    for (o = r.length; n = r[--o]; a.call(e, n) && t(n));
                                }), y(e, t)
                            }, !n("json-stringify")) {
                            var A = {
                                    92: "\\\\",
                                    34: '\\"',
                                    8: "\\b",
                                    12: "\\f",
                                    10: "\\n",
                                    13: "\\r",
                                    9: "\\t"
                                },
                                C = function(e, t) {
                                    return ("000000" + (t || 0)).slice(-e)
                                },
                                O = function(e) {
                                    for (var t = '"', n = 0, r = e.length, o = !k || r > 10, i = o && (k ? e.split("") : e); n < r; n++) {
                                        var s = e.charCodeAt(n);
                                        switch (s) {
                                            case 8:
                                            case 9:
                                            case 10:
                                            case 12:
                                            case 13:
                                            case 34:
                                            case 92:
                                                t += A[s];
                                                break;
                                            default:
                                                if (s < 32) {
                                                    t += "\\u00" + C(2, s.toString(16));
                                                    break
                                                }
                                                t += o ? i[n] : e.charAt(n)
                                        }
                                    }
                                    return t + '"'
                                },
                                B = function(e, t, n, r, o, i, s) {
                                    var a, c, u, f, p, l, m, b, k, S, A, T, E, j, _, N;
                                    try {
                                        a = t[e]
                                    } catch (e) {}
                                    if ("object" == typeof a && a)
                                        if ("[object Date]" != (c = v.call(a)) || d.call(a, "toJSON")) "function" == typeof a.toJSON && ("[object Number]" != c && "[object String]" != c && "[object Array]" != c || d.call(a, "toJSON")) && (a = a.toJSON(e));
                                        else if (a > -1 / 0 && a < 1 / 0) {
                                        if (x) {
                                            for (p = w(a / 864e5), u = w(p / 365.2425) + 1970 - 1; x(u + 1, 0) <= p; u++);
                                            for (f = w((p - x(u, 0)) / 30.42); x(u, f + 1) <= p; f++);
                                            p = 1 + p - x(u, f), l = (a % 864e5 + 864e5) % 864e5, m = w(l / 36e5) % 24, b = w(l / 6e4) % 60, k = w(l / 1e3) % 60, S = l % 1e3
                                        } else u = a.getUTCFullYear(), f = a.getUTCMonth(), p = a.getUTCDate(), m = a.getUTCHours(), b = a.getUTCMinutes(), k = a.getUTCSeconds(), S = a.getUTCMilliseconds();
                                        a = (u <= 0 || u >= 1e4 ? (u < 0 ? "-" : "+") + C(6, u < 0 ? -u : u) : C(4, u)) + "-" + C(2, f + 1) + "-" + C(2, p) + "T" + C(2, m) + ":" + C(2, b) + ":" + C(2, k) + "." + C(3, S) + "Z"
                                    } else a = null;
                                    if (n && (a = n.call(t, e, a)), null === a) return "null";
                                    if ("[object Boolean]" == (c = v.call(a))) return "" + a;
                                    if ("[object Number]" == c) return a > -1 / 0 && a < 1 / 0 ? "" + a : "null";
                                    if ("[object String]" == c) return O("" + a);
                                    if ("object" == typeof a) {
                                        for (j = s.length; j--;)
                                            if (s[j] === a) throw h();
                                        if (s.push(a), A = [], _ = i, i += o, "[object Array]" == c) {
                                            for (E = 0, j = a.length; E < j; E++) T = B(E, a, n, r, o, i, s), A.push(T === g ? "null" : T);
                                            N = A.length ? o ? "[\n" + i + A.join(",\n" + i) + "\n" + _ + "]" : "[" + A.join(",") + "]" : "[]"
                                        } else y(r || a, function(e) {
                                            var t = B(e, a, n, r, o, i, s);
                                            t !== g && A.push(O(e) + ":" + (o ? " " : "") + t)
                                        }), N = A.length ? o ? "{\n" + i + A.join(",\n" + i) + "\n" + _ + "}" : "{" + A.join(",") + "}" : "{}";
                                        return s.pop(), N
                                    }
                                };
                            t.stringify = function(e, t, n) {
                                var r, o, s, a;
                                if (i[typeof t] && t)
                                    if ("[object Function]" == (a = v.call(t))) o = t;
                                    else if ("[object Array]" == a) {
                                    s = {};
                                    for (var c, u = 0, f = t.length; u < f; c = t[u++], ("[object String]" == (a = v.call(c)) || "[object Number]" == a) && (s[c] = 1));
                                }
                                if (n)
                                    if ("[object Number]" == (a = v.call(n))) {
                                        if ((n -= n % 1) > 0)
                                            for (r = "", n > 10 && (n = 10); r.length < n; r += " ");
                                    } else "[object String]" == a && (r = n.length <= 10 ? n : n.slice(0, 10));
                                return B("", (c = {}, c[""] = e, c), o, s, r, "", [])
                            }
                        }
                        if (!n("json-parse")) {
                            var T, E, j = s.fromCharCode,
                                _ = {
                                    92: "\\",
                                    34: '"',
                                    47: "/",
                                    98: "\b",
                                    116: "\t",
                                    110: "\n",
                                    102: "\f",
                                    114: "\r"
                                },
                                N = function() {
                                    throw T = E = null, f()
                                },
                                M = function() {
                                    for (var e, t, n, r, o, i = E, s = i.length; T < s;) switch (o = i.charCodeAt(T)) {
                                        case 9:
                                        case 10:
                                        case 13:
                                        case 32:
                                            T++;
                                            break;
                                        case 123:
                                        case 125:
                                        case 91:
                                        case 93:
                                        case 58:
                                        case 44:
                                            return e = k ? i.charAt(T) : i[T], T++, e;
                                        case 34:
                                            for (e = "@", T++; T < s;)
                                                if ((o = i.charCodeAt(T)) < 32) N();
                                                else if (92 == o) switch (o = i.charCodeAt(++T)) {
                                                case 92:
                                                case 34:
                                                case 47:
                                                case 98:
                                                case 116:
                                                case 110:
                                                case 102:
                                                case 114:
                                                    e += _[o], T++;
                                                    break;
                                                case 117:
                                                    for (t = ++T, n = T + 4; T < n; T++)(o = i.charCodeAt(T)) >= 48 && o <= 57 || o >= 97 && o <= 102 || o >= 65 && o <= 70 || N();
                                                    e += j("0x" + i.slice(t, T));
                                                    break;
                                                default:
                                                    N()
                                            } else {
                                                if (34 == o) break;
                                                for (o = i.charCodeAt(T), t = T; o >= 32 && 92 != o && 34 != o;) o = i.charCodeAt(++T);
                                                e += i.slice(t, T)
                                            }
                                            if (34 == i.charCodeAt(T)) return T++, e;
                                            N();
                                        default:
                                            if (t = T, 45 == o && (r = !0, o = i.charCodeAt(++T)), o >= 48 && o <= 57) {
                                                for (48 == o && (o = i.charCodeAt(T + 1)) >= 48 && o <= 57 && N(), r = !1; T < s && (o = i.charCodeAt(T)) >= 48 && o <= 57; T++);
                                                if (46 == i.charCodeAt(T)) {
                                                    for (n = ++T; n < s && (o = i.charCodeAt(n)) >= 48 && o <= 57; n++);
                                                    n == T && N(), T = n
                                                }
                                                if (101 == (o = i.charCodeAt(T)) || 69 == o) {
                                                    for (o = i.charCodeAt(++T), 43 != o && 45 != o || T++, n = T; n < s && (o = i.charCodeAt(n)) >= 48 && o <= 57; n++);
                                                    n == T && N(), T = n
                                                }
                                                return +i.slice(t, T)
                                            }
                                            if (r && N(), "true" == i.slice(T, T + 4)) return T += 4, !0;
                                            if ("false" == i.slice(T, T + 5)) return T += 5, !1;
                                            if ("null" == i.slice(T, T + 4)) return T += 4, null;
                                            N()
                                    }
                                    return "$"
                                },
                                P = function(e) {
                                    var t, n;
                                    if ("$" == e && N(), "string" == typeof e) {
                                        if ("@" == (k ? e.charAt(0) : e[0])) return e.slice(1);
                                        if ("[" == e) {
                                            for (t = [];
                                                "]" != (e = M()); n || (n = !0)) n && ("," == e ? "]" == (e = M()) && N() : N()), "," == e && N(), t.push(P(e));
                                            return t
                                        }
                                        if ("{" == e) {
                                            for (t = {};
                                                "}" != (e = M()); n || (n = !0)) n && ("," == e ? "}" == (e = M()) && N() : N()), "," != e && "string" == typeof e && "@" == (k ? e.charAt(0) : e[0]) && ":" == M() || N(), t[e.slice(1)] = P(M());
                                            return t
                                        }
                                        N()
                                    }
                                    return e
                                },
                                R = function(e, t, n) {
                                    var r = L(e, t, n);
                                    r === g ? delete e[t] : e[t] = r
                                },
                                L = function(e, t, n) {
                                    var r, o = e[t];
                                    if ("object" == typeof o && o)
                                        if ("[object Array]" == v.call(o))
                                            for (r = o.length; r--;) R(o, r, n);
                                        else y(o, function(e) {
                                            R(o, e, n)
                                        });
                                    return n.call(e, t, o)
                                };
                            t.parse = function(e, t) {
                                var n, r;
                                return T = 0, E = "" + e, n = P(M()), "$" != M() && N(), T = E = null, t && "[object Function]" == v.call(t) ? L((r = {}, r[""] = n, r), "", t) : n
                            }
                        }
                    }
                    return t.runInContext = r, t
                }
                var o = "function" == typeof define && define.amd,
                    i = {
                        function: !0,
                        object: !0
                    },
                    s = i[typeof n] && n && !n.nodeType && n,
                    a = i[typeof window] && window || this,
                    c = s && i[typeof t] && t && !t.nodeType && "object" == typeof e && e;
                if (!c || c.global !== c && c.window !== c && c.self !== c || (a = c), s && !o) r(a, s);
                else {
                    var u = a.JSON,
                        f = a.JSON3,
                        h = !1,
                        p = r(a, a.JSON3 = {
                            noConflict: function() {
                                return h || (h = !0, a.JSON = u, a.JSON3 = f, u = f = null), p
                            }
                        });
                    a.JSON = {
                        parse: p.parse,
                        stringify: p.stringify
                    }
                }
                o && define(function() {
                    return p
                })
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    29: [function(e, t, n) {
        function r(e) {
            if (e = String(e), !(e.length > 1e4)) {
                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                if (t) {
                    var n = parseFloat(t[1]);
                    switch ((t[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return n * h;
                        case "days":
                        case "day":
                        case "d":
                            return n * f;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return n * u;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return n * c;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return n * a;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return n;
                        default:
                            return
                    }
                }
            }
        }

        function o(e) {
            return e >= f ? Math.round(e / f) + "d" : e >= u ? Math.round(e / u) + "h" : e >= c ? Math.round(e / c) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
        }

        function i(e) {
            return s(e, f, "day") || s(e, u, "hour") || s(e, c, "minute") || s(e, a, "second") || e + " ms"
        }

        function s(e, t, n) {
            if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
        }
        var a = 1e3,
            c = 60 * a,
            u = 60 * c,
            f = 24 * u,
            h = 365.25 * f;
        t.exports = function(e, t) {
            t = t || {};
            var n = typeof e;
            if ("string" === n && e.length > 0) return r(e);
            if ("number" === n && !1 === isNaN(e)) return t.long ? i(e) : o(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        }
    }, {}],
    30: [function(e, t, n) {
        (function(e) {
            var n = /^[\],:{}\s]*$/,
                r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                i = /(?:^|:|,)(?:\s*\[)+/g,
                s = /^\s+/,
                a = /\s+$/;
            t.exports = function(t) {
                return "string" == typeof t && t ? (t = t.replace(s, "").replace(a, ""), e.JSON && JSON.parse ? JSON.parse(t) : n.test(t.replace(r, "@").replace(o, "]").replace(i, "")) ? new Function("return " + t)() : void 0) : null
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    31: [function(e, t, n) {
        n.encode = function(e) {
            var t = "";
            for (var n in e) e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
            return t
        }, n.decode = function(e) {
            for (var t = {}, n = e.split("&"), r = 0, o = n.length; r < o; r++) {
                var i = n[r].split("=");
                t[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
            }
            return t
        }
    }, {}],
    32: [function(e, t, n) {
        var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        t.exports = function(e) {
            var t = e,
                n = e.indexOf("["),
                i = e.indexOf("]"); - 1 != n && -1 != i && (e = e.substring(0, n) + e.substring(n, i).replace(/:/g, ";") + e.substring(i, e.length));
            for (var s = r.exec(e || ""), a = {}, c = 14; c--;) a[o[c]] = s[c] || "";
            return -1 != n && -1 != i && (a.source = t, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
        }
    }, {}],
    33: [function(e, t, n) {
        function r() {
            throw new Error("setTimeout has not been defined")
        }

        function o() {
            throw new Error("clearTimeout has not been defined")
        }

        function i(e) {
            if (h === setTimeout) return setTimeout(e, 0);
            if ((h === r || !h) && setTimeout) return h = setTimeout, setTimeout(e, 0);
            try {
                return h(e, 0)
            } catch (t) {
                try {
                    return h.call(null, e, 0)
                } catch (t) {
                    return h.call(this, e, 0)
                }
            }
        }

        function s(e) {
            if (p === clearTimeout) return clearTimeout(e);
            if ((p === o || !p) && clearTimeout) return p = clearTimeout, clearTimeout(e);
            try {
                return p(e)
            } catch (t) {
                try {
                    return p.call(null, e)
                } catch (t) {
                    return p.call(this, e)
                }
            }
        }

        function a() {
            g && d && (g = !1, d.length ? y = d.concat(y) : m = -1, y.length && c())
        }

        function c() {
            if (!g) {
                var e = i(a);
                g = !0;
                for (var t = y.length; t;) {
                    for (d = y, y = []; ++m < t;) d && d[m].run();
                    m = -1, t = y.length
                }
                d = null, g = !1, s(e)
            }
        }

        function u(e, t) {
            this.fun = e, this.array = t
        }

        function f() {}
        var h, p, l = t.exports = {};
        ! function() {
            try {
                h = "function" == typeof setTimeout ? setTimeout : r
            } catch (e) {
                h = r
            }
            try {
                p = "function" == typeof clearTimeout ? clearTimeout : o
            } catch (e) {
                p = o
            }
        }();
        var d, y = [],
            g = !1,
            m = -1;
        l.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            y.push(new u(e, t)), 1 !== y.length || g || i(c)
        }, u.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = f, l.addListener = f, l.once = f, l.off = f, l.removeListener = f, l.removeAllListeners = f, l.emit = f, l.prependListener = f, l.prependOnceListener = f, l.listeners = function(e) {
            return []
        }, l.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, l.cwd = function() {
            return "/"
        }, l.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, l.umask = function() {
            return 0
        }
    }, {}],
    34: [function(e, t, n) {
        function r(e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var n, r = i(e),
                s = r.source,
                f = r.id,
                h = r.path,
                p = u[f] && h in u[f].nsps,
                l = t.forceNew || t["force new connection"] || !1 === t.multiplex || p;
            return l ? (c("ignoring socket cache for %s", s), n = a(s, t)) : (u[f] || (c("new io instance for %s", s), u[f] = a(s, t)), n = u[f]), r.query && !t.query ? t.query = r.query : t && "object" == typeof t.query && (t.query = o(t.query)), n.socket(r.path, t)
        }

        function o(e) {
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
            return t.join("&")
        }
        var i = e("./url"),
            s = e("socket.io-parser"),
            a = e("./manager"),
            c = e("debug")("socket.io-client");
        t.exports = n = r;
        var u = n.managers = {};
        n.protocol = s.protocol, n.connect = r, n.Manager = e("./manager"), n.Socket = e("./socket")
    }, {
        "./manager": 35,
        "./socket": 37,
        "./url": 38,
        debug: 10,
        "socket.io-parser": 40
    }],
    35: [function(e, t, n) {
        function r(e, t) {
            if (!(this instanceof r)) return new r(e, t);
            e && "object" == typeof e && (t = e, e = void 0), t = t || {}, t.path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new p({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [], this.encoder = new a.Encoder, this.decoder = new a.Decoder, this.autoConnect = !1 !== t.autoConnect, this.autoConnect && this.open()
        }
        var o = e("engine.io-client"),
            i = e("./socket"),
            s = e("component-emitter"),
            a = e("socket.io-parser"),
            c = e("./on"),
            u = e("component-bind"),
            f = e("debug")("socket.io-client:manager"),
            h = e("indexof"),
            p = e("backo2"),
            l = Object.prototype.hasOwnProperty;
        t.exports = r, r.prototype.emitAll = function() {
            this.emit.apply(this, arguments);
            for (var e in this.nsps) l.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
        }, r.prototype.updateSocketIds = function() {
            for (var e in this.nsps) l.call(this.nsps, e) && (this.nsps[e].id = this.engine.id)
        }, s(r.prototype), r.prototype.reconnection = function(e) {
            return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
        }, r.prototype.reconnectionAttempts = function(e) {
            return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts
        }, r.prototype.reconnectionDelay = function(e) {
            return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay
        }, r.prototype.randomizationFactor = function(e) {
            return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor
        }, r.prototype.reconnectionDelayMax = function(e) {
            return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax
        }, r.prototype.timeout = function(e) {
            return arguments.length ? (this._timeout = e, this) : this._timeout
        }, r.prototype.maybeReconnectOnOpen = function() {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
        }, r.prototype.open = r.prototype.connect = function(e, t) {
            if (f("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
            f("opening %s", this.uri), this.engine = o(this.uri, this.opts);
            var n = this.engine,
                r = this;
            this.readyState = "opening", this.skipReconnect = !1;
            var i = c(n, "open", function() {
                    r.onopen(), e && e()
                }),
                s = c(n, "error", function(t) {
                    if (f("connect_error"), r.cleanup(), r.readyState = "closed", r.emitAll("connect_error", t), e) {
                        var n = new Error("Connection error");
                        n.data = t, e(n)
                    } else r.maybeReconnectOnOpen()
                });
            if (!1 !== this._timeout) {
                var a = this._timeout;
                f("connect attempt will timeout after %d", a);
                var u = setTimeout(function() {
                    f("connect attempt timed out after %d", a), i.destroy(), n.close(), n.emit("error", "timeout"), r.emitAll("connect_timeout", a)
                }, a);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(u)
                    }
                })
            }
            return this.subs.push(i), this.subs.push(s), this
        }, r.prototype.onopen = function() {
            f("open"), this.cleanup(), this.readyState = "open", this.emit("open");
            var e = this.engine;
            this.subs.push(c(e, "data", u(this, "ondata"))), this.subs.push(c(e, "ping", u(this, "onping"))), this.subs.push(c(e, "pong", u(this, "onpong"))), this.subs.push(c(e, "error", u(this, "onerror"))), this.subs.push(c(e, "close", u(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", u(this, "ondecoded")))
        }, r.prototype.onping = function() {
            this.lastPing = new Date, this.emitAll("ping")
        }, r.prototype.onpong = function() {
            this.emitAll("pong", new Date - this.lastPing)
        }, r.prototype.ondata = function(e) {
            this.decoder.add(e)
        }, r.prototype.ondecoded = function(e) {
            this.emit("packet", e)
        }, r.prototype.onerror = function(e) {
            f("error", e), this.emitAll("error", e)
        }, r.prototype.socket = function(e, t) {
            function n() {
                ~h(o.connecting, r) || o.connecting.push(r)
            }
            var r = this.nsps[e];
            if (!r) {
                r = new i(this, e, t), this.nsps[e] = r;
                var o = this;
                r.on("connecting", n), r.on("connect", function() {
                    r.id = o.engine.id
                }), this.autoConnect && n()
            }
            return r
        }, r.prototype.destroy = function(e) {
            var t = h(this.connecting, e);
            ~t && this.connecting.splice(t, 1), this.connecting.length || this.close()
        }, r.prototype.packet = function(e) {
            f("writing packet %j", e);
            var t = this;
            e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, function(n) {
                for (var r = 0; r < n.length; r++) t.engine.write(n[r], e.options);
                t.encoding = !1, t.processPacketQueue()
            }))
        }, r.prototype.processPacketQueue = function() {
            if (this.packetBuffer.length > 0 && !this.encoding) {
                var e = this.packetBuffer.shift();
                this.packet(e)
            }
        }, r.prototype.cleanup = function() {
            f("cleanup");
            for (var e = this.subs.length, t = 0; t < e; t++) {
                this.subs.shift().destroy()
            }
            this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
        }, r.prototype.close = r.prototype.disconnect = function() {
            f("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
        }, r.prototype.onclose = function(e) {
            f("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
        }, r.prototype.reconnect = function() {
            if (this.reconnecting || this.skipReconnect) return this;
            var e = this;
            if (this.backoff.attempts >= this._reconnectionAttempts) f("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
            else {
                var t = this.backoff.duration();
                f("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
                var n = setTimeout(function() {
                    e.skipReconnect || (f("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open(function(t) {
                        t ? (f("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (f("reconnect success"), e.onreconnect())
                    }))
                }, t);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(n)
                    }
                })
            }
        }, r.prototype.onreconnect = function() {
            var e = this.backoff.attempts;
            this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e)
        }
    }, {
        "./on": 36,
        "./socket": 37,
        backo2: 3,
        "component-bind": 7,
        "component-emitter": 8,
        debug: 10,
        "engine.io-client": 12,
        indexof: 26,
        "socket.io-parser": 40
    }],
    36: [function(e, t, n) {
        function r(e, t, n) {
            return e.on(t, n), {
                destroy: function() {
                    e.removeListener(t, n)
                }
            }
        }
        t.exports = r
    }, {}],
    37: [function(e, t, n) {
        function r(e, t, n) {
            this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, n && n.query && (this.query = n.query), this.io.autoConnect && this.open()
        }
        var o = e("socket.io-parser"),
            i = e("component-emitter"),
            s = e("to-array"),
            a = e("./on"),
            c = e("component-bind"),
            u = e("debug")("socket.io-client:socket"),
            f = e("has-binary");
        t.exports = r;
        var h = {
                connect: 1,
                connect_error: 1,
                connect_timeout: 1,
                connecting: 1,
                disconnect: 1,
                error: 1,
                reconnect: 1,
                reconnect_attempt: 1,
                reconnect_failed: 1,
                reconnect_error: 1,
                reconnecting: 1,
                ping: 1,
                pong: 1
            },
            p = i.prototype.emit;
        i(r.prototype), r.prototype.subEvents = function() {
            if (!this.subs) {
                var e = this.io;
                this.subs = [a(e, "open", c(this, "onopen")), a(e, "packet", c(this, "onpacket")), a(e, "close", c(this, "onclose"))]
            }
        }, r.prototype.open = r.prototype.connect = function() {
            return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this)
        }, r.prototype.send = function() {
            var e = s(arguments);
            return e.unshift("message"), this.emit.apply(this, e), this
        }, r.prototype.emit = function(e) {
            if (h.hasOwnProperty(e)) return p.apply(this, arguments), this;
            var t = s(arguments),
                n = o.EVENT;
            f(t) && (n = o.BINARY_EVENT);
            var r = {
                type: n,
                data: t
            };
            return r.options = {}, r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (u("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), delete this.flags, this
        }, r.prototype.packet = function(e) {
            e.nsp = this.nsp, this.io.packet(e)
        }, r.prototype.onopen = function() {
            u("transport is open - connecting"), "/" !== this.nsp && (this.query ? this.packet({
                type: o.CONNECT,
                query: this.query
            }) : this.packet({
                type: o.CONNECT
            }))
        }, r.prototype.onclose = function(e) {
            u("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e)
        }, r.prototype.onpacket = function(e) {
            if (e.nsp === this.nsp) switch (e.type) {
                case o.CONNECT:
                    this.onconnect();
                    break;
                case o.EVENT:
                case o.BINARY_EVENT:
                    this.onevent(e);
                    break;
                case o.ACK:
                case o.BINARY_ACK:
                    this.onack(e);
                    break;
                case o.DISCONNECT:
                    this.ondisconnect();
                    break;
                case o.ERROR:
                    this.emit("error", e.data)
            }
        }, r.prototype.onevent = function(e) {
            var t = e.data || [];
            u("emitting event %j", t), null != e.id && (u("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? p.apply(this, t) : this.receiveBuffer.push(t)
        }, r.prototype.ack = function(e) {
            var t = this,
                n = !1;
            return function() {
                if (!n) {
                    n = !0;
                    var r = s(arguments);
                    u("sending ack %j", r);
                    var i = f(r) ? o.BINARY_ACK : o.ACK;
                    t.packet({
                        type: i,
                        id: e,
                        data: r
                    })
                }
            }
        }, r.prototype.onack = function(e) {
            var t = this.acks[e.id];
            "function" == typeof t ? (u("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), delete this.acks[e.id]) : u("bad ack %s", e.id)
        }, r.prototype.onconnect = function() {
            this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
        }, r.prototype.emitBuffered = function() {
            var e;
            for (e = 0; e < this.receiveBuffer.length; e++) p.apply(this, this.receiveBuffer[e]);
            for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
            this.sendBuffer = []
        }, r.prototype.ondisconnect = function() {
            u("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
        }, r.prototype.destroy = function() {
            if (this.subs) {
                for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
                this.subs = null
            }
            this.io.destroy(this)
        }, r.prototype.close = r.prototype.disconnect = function() {
            return this.connected && (u("performing disconnect (%s)", this.nsp), this.packet({
                type: o.DISCONNECT
            })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
        }, r.prototype.compress = function(e) {
            return this.flags = this.flags || {}, this.flags.compress = e, this
        }
    }, {
        "./on": 36,
        "component-bind": 7,
        "component-emitter": 8,
        debug: 10,
        "has-binary": 24,
        "socket.io-parser": 40,
        "to-array": 46
    }],
    38: [function(e, t, n) {
        (function(n) {
            function r(e, t) {
                var r = e;
                t = t || n.location, null == e && (e = t.protocol + "//" + t.host), "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e), /^(https?|wss?):\/\//.test(e) || (i("protocol-less url %s", e), e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), i("parse %s", e), r = o(e)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
                var s = -1 !== r.host.indexOf(":"),
                    a = s ? "[" + r.host + "]" : r.host;
                return r.id = r.protocol + "://" + a + ":" + r.port, r.href = r.protocol + "://" + a + (t && t.port === r.port ? "" : ":" + r.port), r
            }
            var o = e("parseuri"),
                i = e("debug")("socket.io-client:url");
            t.exports = r
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        debug: 10,
        parseuri: 32
    }],
    39: [function(e, t, n) {
        (function(t) {
            var r = e("isarray"),
                o = e("./is-buffer");
            n.deconstructPacket = function(e) {
                function t(e) {
                    if (!e) return e;
                    if (o(e)) {
                        var i = {
                            _placeholder: !0,
                            num: n.length
                        };
                        return n.push(e), i
                    }
                    if (r(e)) {
                        for (var s = new Array(e.length), a = 0; a < e.length; a++) s[a] = t(e[a]);
                        return s
                    }
                    if ("object" == typeof e && !(e instanceof Date)) {
                        var s = {};
                        for (var c in e) s[c] = t(e[c]);
                        return s
                    }
                    return e
                }
                var n = [],
                    i = e.data,
                    s = e;
                return s.data = t(i), s.attachments = n.length, {
                    packet: s,
                    buffers: n
                }
            }, n.reconstructPacket = function(e, t) {
                function n(e) {
                    if (e && e._placeholder) {
                        return t[e.num]
                    }
                    if (r(e)) {
                        for (var o = 0; o < e.length; o++) e[o] = n(e[o]);
                        return e
                    }
                    if (e && "object" == typeof e) {
                        for (var i in e) e[i] = n(e[i]);
                        return e
                    }
                    return e
                }
                return e.data = n(e.data), e.attachments = void 0, e
            }, n.removeBlobs = function(e, n) {
                function i(e, c, u) {
                    if (!e) return e;
                    if (t.Blob && e instanceof Blob || t.File && e instanceof File) {
                        s++;
                        var f = new FileReader;
                        f.onload = function() {
                            u ? u[c] = this.result : a = this.result, --s || n(a)
                        }, f.readAsArrayBuffer(e)
                    } else if (r(e))
                        for (var h = 0; h < e.length; h++) i(e[h], h, e);
                    else if (e && "object" == typeof e && !o(e))
                        for (var p in e) i(e[p], p, e)
                }
                var s = 0,
                    a = e;
                i(a), s || n(a)
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./is-buffer": 41,
        isarray: 27
    }],
    40: [function(e, t, n) {
        function r() {}

        function o(e) {
            var t = "",
                r = !1;
            return t += e.type, n.BINARY_EVENT != e.type && n.BINARY_ACK != e.type || (t += e.attachments, t += "-"), e.nsp && "/" != e.nsp && (r = !0, t += e.nsp), null != e.id && (r && (t += ",", r = !1), t += e.id), null != e.data && (r && (t += ","), t += p.stringify(e.data)), h("encoded %j as %s", e, t), t
        }

        function i(e, t) {
            function n(e) {
                var n = d.deconstructPacket(e),
                    r = o(n.packet),
                    i = n.buffers;
                i.unshift(r), t(i)
            }
            d.removeBlobs(e, n)
        }

        function s() {
            this.reconstructor = null
        }

        function a(e) {
            var t = {},
                r = 0;
            if (t.type = Number(e.charAt(0)), null == n.types[t.type]) return f();
            if (n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) {
                for (var o = "";
                    "-" != e.charAt(++r) && (o += e.charAt(r), r != e.length););
                if (o != Number(o) || "-" != e.charAt(r)) throw new Error("Illegal attachments");
                t.attachments = Number(o)
            }
            if ("/" == e.charAt(r + 1))
                for (t.nsp = ""; ++r;) {
                    var i = e.charAt(r);
                    if ("," == i) break;
                    if (t.nsp += i, r == e.length) break
                } else t.nsp = "/";
            var s = e.charAt(r + 1);
            if ("" !== s && Number(s) == s) {
                for (t.id = ""; ++r;) {
                    var i = e.charAt(r);
                    if (null == i || Number(i) != i) {
                        --r;
                        break
                    }
                    if (t.id += e.charAt(r), r == e.length) break
                }
                t.id = Number(t.id)
            }
            return e.charAt(++r) && (t = c(t, e.substr(r))), h("decoded %s as %j", e, t), t
        }

        function c(e, t) {
            try {
                e.data = p.parse(t)
            } catch (e) {
                return f()
            }
            return e
        }

        function u(e) {
            this.reconPack = e, this.buffers = []
        }

        function f(e) {
            return {
                type: n.ERROR,
                data: "parser error"
            }
        }
        var h = e("debug")("socket.io-parser"),
            p = e("json3"),
            l = e("component-emitter"),
            d = e("./binary"),
            y = e("./is-buffer");
        n.protocol = 4, n.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], n.CONNECT = 0, n.DISCONNECT = 1, n.EVENT = 2, n.ACK = 3, n.ERROR = 4, n.BINARY_EVENT = 5, n.BINARY_ACK = 6, n.Encoder = r, n.Decoder = s, r.prototype.encode = function(e, t) {
            if (h("encoding packet %j", e), n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type) i(e, t);
            else {
                t([o(e)])
            }
        }, l(s.prototype), s.prototype.add = function(e) {
            var t;
            if ("string" == typeof e) t = a(e), n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type ? (this.reconstructor = new u(t), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", t)) : this.emit("decoded", t);
            else {
                if (!y(e) && !e.base64) throw new Error("Unknown type: " + e);
                if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                (t = this.reconstructor.takeBinaryData(e)) && (this.reconstructor = null, this.emit("decoded", t))
            }
        }, s.prototype.destroy = function() {
            this.reconstructor && this.reconstructor.finishedReconstruction()
        }, u.prototype.takeBinaryData = function(e) {
            if (this.buffers.push(e), this.buffers.length == this.reconPack.attachments) {
                var t = d.reconstructPacket(this.reconPack, this.buffers);
                return this.finishedReconstruction(), t
            }
            return null
        }, u.prototype.finishedReconstruction = function() {
            this.reconPack = null, this.buffers = []
        }
    }, {
        "./binary": 39,
        "./is-buffer": 41,
        "component-emitter": 42,
        debug: 43,
        json3: 28
    }],
    41: [function(e, t, n) {
        (function(e) {
            function n(t) {
                return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer
            }
            t.exports = n
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    42: [function(e, t, n) {
        function r(e) {
            if (e) return o(e)
        }

        function o(e) {
            for (var t in r.prototype) e[t] = r.prototype[t];
            return e
        }
        t.exports = r, r.prototype.on = r.prototype.addEventListener = function(e, t) {
            return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this
        }, r.prototype.once = function(e, t) {
            function n() {
                r.off(e, n), t.apply(this, arguments)
            }
            var r = this;
            return this._callbacks = this._callbacks || {}, n.fn = t, this.on(e, n), this
        }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
            var n = this._callbacks[e];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks[e], this;
            for (var r, o = 0; o < n.length; o++)
                if ((r = n[o]) === t || r.fn === t) {
                    n.splice(o, 1);
                    break
                }
            return this
        }, r.prototype.emit = function(e) {
            this._callbacks = this._callbacks || {};
            var t = [].slice.call(arguments, 1),
                n = this._callbacks[e];
            if (n) {
                n = n.slice(0);
                for (var r = 0, o = n.length; r < o; ++r) n[r].apply(this, t)
            }
            return this
        }, r.prototype.listeners = function(e) {
            return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
        }, r.prototype.hasListeners = function(e) {
            return !!this.listeners(e).length
        }
    }, {}],
    43: [function(e, t, n) {
        function r() {
            return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
        }

        function o() {
            var e = arguments,
                t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !t) return e;
            var r = "color: " + this.color;
            e = [e[0], r, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
            var o = 0,
                i = 0;
            return e[0].replace(/%[a-z%]/g, function(e) {
                "%%" !== e && (o++, "%c" === e && (i = o))
            }), e.splice(i, 0, r), e
        }

        function i() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }

        function s(e) {
            try {
                null == e ? n.storage.removeItem("debug") : n.storage.debug = e
            } catch (e) {}
        }

        function a() {
            var e;
            try {
                e = n.storage.debug
            } catch (e) {}
            return e
        }
        n = t.exports = e("./debug"), n.log = i, n.formatArgs = o, n.save = s, n.load = a, n.useColors = r, n.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(), n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function(e) {
            return JSON.stringify(e)
        }, n.enable(a())
    }, {
        "./debug": 44
    }],
    44: [function(e, t, n) {
        function r() {
            return n.colors[f++ % n.colors.length]
        }

        function o(e) {
            function t() {}

            function o() {
                var e = o,
                    t = +new Date,
                    i = t - (u || t);
                e.diff = i, e.prev = u, e.curr = t, u = t, null == e.useColors && (e.useColors = n.useColors()), null == e.color && e.useColors && (e.color = r());
                var s = Array.prototype.slice.call(arguments);
                s[0] = n.coerce(s[0]), "string" != typeof s[0] && (s = ["%o"].concat(s));
                var a = 0;
                s[0] = s[0].replace(/%([a-z%])/g, function(t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var o = n.formatters[r];
                    if ("function" == typeof o) {
                        var i = s[a];
                        t = o.call(e, i), s.splice(a, 1), a--
                    }
                    return t
                }), "function" == typeof n.formatArgs && (s = n.formatArgs.apply(e, s)), (o.log || n.log || console.log.bind(console)).apply(e, s)
            }
            t.enabled = !1, o.enabled = !0;
            var i = n.enabled(e) ? o : t;
            return i.namespace = e, i
        }

        function i(e) {
            n.save(e);
            for (var t = (e || "").split(/[\s,]+/), r = t.length, o = 0; o < r; o++) t[o] && (e = t[o].replace(/\*/g, ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")))
        }

        function s() {
            n.enable("")
        }

        function a(e) {
            var t, r;
            for (t = 0, r = n.skips.length; t < r; t++)
                if (n.skips[t].test(e)) return !1;
            for (t = 0, r = n.names.length; t < r; t++)
                if (n.names[t].test(e)) return !0;
            return !1
        }

        function c(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        n = t.exports = o, n.coerce = c, n.disable = s, n.enable = i, n.enabled = a, n.humanize = e("ms"), n.names = [], n.skips = [], n.formatters = {};
        var u, f = 0
    }, {
        ms: 45
    }],
    45: [function(e, t, n) {
        function r(e) {
            if (e = "" + e, !(e.length > 1e4)) {
                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                if (t) {
                    var n = parseFloat(t[1]);
                    switch ((t[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return n * h;
                        case "days":
                        case "day":
                        case "d":
                            return n * f;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return n * u;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return n * c;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return n * a;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return n
                    }
                }
            }
        }

        function o(e) {
            return e >= f ? Math.round(e / f) + "d" : e >= u ? Math.round(e / u) + "h" : e >= c ? Math.round(e / c) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
        }

        function i(e) {
            return s(e, f, "day") || s(e, u, "hour") || s(e, c, "minute") || s(e, a, "second") || e + " ms"
        }

        function s(e, t, n) {
            if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
        }
        var a = 1e3,
            c = 60 * a,
            u = 60 * c,
            f = 24 * u,
            h = 365.25 * f;
        t.exports = function(e, t) {
            return t = t || {}, "string" == typeof e ? r(e) : t.long ? i(e) : o(e)
        }
    }, {}],
    46: [function(e, t, n) {
        function r(e, t) {
            var n = [];
            t = t || 0;
            for (var r = t || 0; r < e.length; r++) n[r - t] = e[r];
            return n
        }
        t.exports = r
    }, {}],
    47: [function(e, t, n) {
        (function(e) {
            ! function(r) {
                function o(e) {
                    for (var t, n, r = [], o = 0, i = e.length; o < i;) t = e.charCodeAt(o++), t >= 55296 && t <= 56319 && o < i ? (n = e.charCodeAt(o++), 56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), o--)) : r.push(t);
                    return r
                }

                function i(e) {
                    for (var t, n = e.length, r = -1, o = ""; ++r < n;) t = e[r], t > 65535 && (t -= 65536, o += v(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), o += v(t);
                    return o
                }

                function s(e, t) {
                    return v(e >> t & 63 | 128)
                }

                function a(e) {
                    if (0 == (4294967168 & e)) return v(e);
                    var t = "";
                    return 0 == (4294965248 & e) ? t = v(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (t = v(e >> 12 & 15 | 224), t += s(e, 6)) : 0 == (4292870144 & e) && (t = v(e >> 18 & 7 | 240), t += s(e, 12), t += s(e, 6)), t += v(63 & e | 128)
                }

                function c(e) {
                    for (var t, n = o(e), r = n.length, i = -1, s = ""; ++i < r;) t = n[i], s += a(t);
                    return s
                }

                function u() {
                    if (m >= g) throw Error("Invalid byte index");
                    var e = 255 & y[m];
                    if (m++, 128 == (192 & e)) return 63 & e;
                    throw Error("Invalid continuation byte")
                }

                function f() {
                    var e, t, n, r, o;
                    if (m > g) throw Error("Invalid byte index");
                    if (m == g) return !1;
                    if (e = 255 & y[m], m++, 0 == (128 & e)) return e;
                    if (192 == (224 & e)) {
                        var t = u();
                        if ((o = (31 & e) << 6 | t) >= 128) return o;
                        throw Error("Invalid continuation byte")
                    }
                    if (224 == (240 & e)) {
                        if (t = u(), n = u(), (o = (15 & e) << 12 | t << 6 | n) >= 2048) return o;
                        throw Error("Invalid continuation byte")
                    }
                    if (240 == (248 & e) && (t = u(), n = u(), r = u(), (o = (15 & e) << 18 | t << 12 | n << 6 | r) >= 65536 && o <= 1114111)) return o;
                    throw Error("Invalid WTF-8 detected")
                }

                function h(e) {
                    y = o(e), g = y.length, m = 0;
                    for (var t, n = []; !1 !== (t = f());) n.push(t);
                    return i(n)
                }
                var p = "object" == typeof n && n,
                    l = "object" == typeof t && t && t.exports == p && t,
                    d = "object" == typeof e && e;
                d.global !== d && d.window !== d || (r = d);
                var y, g, m, v = String.fromCharCode,
                    b = {
                        version: "1.0.0",
                        encode: c,
                        decode: h
                    };
                if ("function" == typeof define && "object" == typeof define.amd && define.amd) define(function() {
                    return b
                });
                else if (p && !p.nodeType)
                    if (l) l.exports = b;
                    else {
                        var k = {},
                            w = k.hasOwnProperty;
                        for (var S in b) w.call(b, S) && (p[S] = b[S])
                    }
                else r.wtf8 = b
            }(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    48: [function(e, t, n) {
        "use strict";

        function r(e) {
            var t = "";
            do {
                t = a[e % c] + t, e = Math.floor(e / c)
            } while (e > 0);
            return t
        }

        function o(e) {
            var t = 0;
            for (h = 0; h < e.length; h++) t = t * c + u[e.charAt(h)];
            return t
        }

        function i() {
            var e = r(+new Date);
            return e !== s ? (f = 0, s = e) : e + "." + r(f++)
        }
        for (var s, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), c = 64, u = {}, f = 0, h = 0; h < c; h++) u[a[h]] = h;
        i.encode = r, i.decode = o, t.exports = i
    }, {}],
    49: [function(e, t, n) {
        "use strict";
        var r = e("./livescore/LiveScoreManager"),
            o = e("./scoreboard/ScoreboardApi");
        ! function(e) {
            e.scorebot_client_api = {
                aScoreboardApi: function(e, t, n) {
                    return new o.ScoreboardApi(e, n, t)
                },
                aLiveScoreApi: function(e, t) {
                    return new r.LiveScoreManager(e, t)
                }
            }
        }(window.hltv = window.hltv || {})
    }, {
        "./livescore/LiveScoreManager": 50,
        "./scoreboard/ScoreboardApi": 54
    }],
    50: [function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.LiveScoreManager = void 0;
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            i = e("./MatchScoreReceiver"),
            s = e("./MatchScoreFactory"),
            a = e("./SocketIO");
        n.LiveScoreManager = function() {
            function e(t, n) {
                r(this, e), this.matchScoreFactories = [];
                var o = new i.MatchScoreReceiver(this.matchScoreFactories);
                this.socketIO = new a.SocketIO(t, n, o)
            }
            return o(e, [{
                key: "forMatch",
                value: function(e, t) {
                    var n = new s.MatchScoreFactory(e);
                    return t(n), this.matchScoreFactories.push(n), this
                }
            }, {
                key: "forAdditionalMatch",
                value: function(e, t) {
                    var n = new s.MatchScoreFactory(e);
                    return t(n), this.matchScoreFactories.push(n), this.socketIO.addMatch(e), this
                }
            }, {
                key: "start",
                value: function() {
                    this.matchScoreFactories.length > 0 && this.socketIO.start(this.matchScoreFactories.map(function(e) {
                        return +e.listId
                    }).filter(e.onlyUnique))
                }
            }], [{
                key: "onlyUnique",
                value: function(e, t, n) {
                    return n.indexOf(e) === t
                }
            }]), e
        }()
    }, {
        "./MatchScoreFactory": 51,
        "./MatchScoreReceiver": 52,
        "./SocketIO": 53
    }],
    51: [function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();
        n.MatchScoreFactory = function() {
            function e(t) {
                r(this, e), this.listId = t, this.configurations = []
            }
            return o(e, [{
                key: "mapsWonFor",
                value: function(e, t) {
                    return this.configurations.push(function(n) {
                        return n.mapsWonFor(e, t)
                    }), this
                }
            }, {
                key: "fullMapScoreFor",
                value: function(e, t, n) {
                    return this.configurations.push(function(r) {
                        return r.fullMapScoreFor(e, t, n)
                    }), this
                }
            }, {
                key: "currentMapScoreFor",
                value: function(e, t) {
                    return this.configurations.push(function(n) {
                        return n.currentMapScoreFor(e, t)
                    }), this
                }
            }, {
                key: "firstHalfScoreFor",
                value: function(e, t, n) {
                    return this.configurations.push(function(r) {
                        return r.firstHalfScoreFor(e, t, n)
                    }), this
                }
            }, {
                key: "secondHalfScoreFor",
                value: function(e, t, n) {
                    return this.configurations.push(function(r) {
                        return r.secondHalfScoreFor(e, t, n)
                    }), this
                }
            }, {
                key: "overtimeHalfScoreFor",
                value: function(e, t, n) {
                    return this.configurations.push(function(r) {
                        return r.overtimeHalfScoreFor(e, t, n)
                    }), this
                }
            }, {
                key: "currentMapName",
                value: function(e) {
                    return this.configurations.push(function(t) {
                        return t.currentMapName(e)
                    }), this
                }
            }, {
                key: "isLive",
                value: function(e) {
                    return this.configurations.push(function(t) {
                        return t.isLive(e)
                    }), this
                }
            }, {
                key: "isForcedLive",
                value: function(e) {
                    return this.configurations.push(function(t) {
                        return t.isForcedLive(e)
                    }), this
                }
            }, {
                key: "isForcedDead",
                value: function(e) {
                    return this.configurations.push(function(t) {
                        return t.isForcedDead(e)
                    }), this
                }
            }, {
                key: "apply",
                value: function(e) {
                    this.configurations.forEach(function(t) {
                        return t(e)
                    })
                }
            }]), e
        }()
    }, {}],
    52: [function(e, t, n) {
        "use strict";

        function r(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }

        function o(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();
        n.MatchScoreReceiver = function() {
            function e(t) {
                i(this, e), this.matchScoreFactories = t
            }
            return s(e, [{
                key: "accept",
                value: function(e) {
                    var t = this;
                    this.matchScore = e, this.matchScoreFactories.filter(function(t) {
                        return t.listId === e.listId
                    }).forEach(function(e) {
                        return e.apply(t)
                    })
                }
            }, {
                key: "mapsWonFor",
                value: function(t, n) {
                    var i, s = this.matchScore,
                        a = s.wins || (i = {}, o(i, t, 0), o(i, "-1", 0), i),
                        c = a[t],
                        u = c < Math.max.apply(Math, r(e.values(a))) ? "trailing" : c > Math.min.apply(Math, r(e.values(a))) ? "leading" : "tie",
                        f = e.noScores(a);
                    n({
                        won: f ? "0" : c,
                        status: f ? "none" : u
                    })
                }
            }, {
                key: "fullMapScoreFor",
                value: function(t, n, i) {
                    var s, a = this.matchScore,
                        c = a.mapScores[n] || {
                            scores: (s = {}, o(s, t, 0), o(s, "-1", 0), s)
                        },
                        u = c.scores,
                        f = u[t],
                        h = e.noScores(u);
                    i({
                        score: h ? "-" : f,
                        status: h ? "none" : f < Math.max.apply(Math, r(e.values(u))) ? "trailing" : f > Math.min.apply(Math, r(e.values(u))) ? "leading" : "tie"
                    })
                }
            }, {
                key: "currentMapScoreFor",
                value: function(t, n) {
                    var o = this.matchScore.mapScores;
                    if (e.isEmptyObject(o)) n({
                        score: "-",
                        status: "none"
                    });
                    else {
                        var i = o[Object.keys(o).sort().reverse()[0]],
                            s = i.scores,
                            a = s[t];
                        n({
                            score: e.noScores(s) ? "-" : a,
                            status: a < Math.max.apply(Math, r(e.values(s))) ? "trailing" : a > Math.min.apply(Math, r(e.values(s))) ? "leading" : "tie"
                        })
                    }
                }
            }, {
                key: "firstHalfScoreFor",
                value: function(t, n, r) {
                    var o = this.matchScore.mapScores[n] || {
                            firstHalf: {
                                ctScore: 0,
                                tScore: 0
                            }
                        },
                        i = o.firstHalf;
                    r(e.halfScore(i, t))
                }
            }, {
                key: "secondHalfScoreFor",
                value: function(t, n, r) {
                    var o = this.matchScore.mapScores[n] || {
                            secondHalf: {
                                ctScore: 0,
                                tScore: 0
                            }
                        },
                        i = o.secondHalf;
                    r(e.halfScore(i, t))
                }
            }, {
                key: "overtimeHalfScoreFor",
                value: function(t, n, r) {
                    var o = this.matchScore.mapScores[n] || {
                            overtime: {
                                ctScore: 0,
                                tScore: 0
                            }
                        },
                        i = o.overtime;
                    r({
                        score: e.halfScore(i, t).score
                    })
                }
            }, {
                key: "isLive",
                value: function(e) {
                    var t = this.matchScore,
                        n = !0;
                    Object.keys(t.liveLog).forEach(function(e) {
                        t.liveLog[e] || (n = !1)
                    }), e({
                        live: n
                    })
                }
            }, {
                key: "isForcedLive",
                value: function(e) {
                    e({
                        forcedLive: this.matchScore.forcedLive
                    })
                }
            }, {
                key: "isForcedDead",
                value: function(e) {
                    e({
                        forcedLive: this.matchScore.forcedDead
                    })
                }
            }, {
                key: "currentMapName",
                value: function(t) {
                    var n = this.matchScore.mapScores,
                        r = "";
                    if (!e.isEmptyObject(n)) {
                        var o = n[Object.keys(n).sort().reverse()[0]];
                        r = o.mapOver ? "" : o.map
                    }
                    t(r)
                }
            }], [{
                key: "noScores",
                value: function(e) {
                    return 0 === Object.keys(e).length || 0 === e[Object.keys(e)[0]] && 0 === e[Object.keys(e)[1]]
                }
            }, {
                key: "values",
                value: function(e) {
                    return Object.keys(e).map(function(t) {
                        return e[t]
                    })
                }
            }, {
                key: "halfScore",
                value: function(e, t) {
                    return 0 === e.tScore && 0 === e.ctScore ? {
                        score: "-",
                        side: "none"
                    } : e.tTeamDbId === t ? {
                        score: e.tScore,
                        side: "Terrorist"
                    } : {
                        score: e.ctScore,
                        side: "CT"
                    }
                }
            }, {
                key: "isEmptyObject",
                value: function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                }
            }]), e
        }()
    }, {}],
    53: [function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.SocketIO = void 0;
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            i = e("socket.io-client"),
            s = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }(i);
        n.SocketIO = function() {
            function e(t, n, o) {
                r(this, e), this.url = t, this.token = n || "", this.receiver = o, this.reconnected = !1, window.WEB_SOCKET_SWF_LOCATION = "http://static.hltv.org/js/socketio/WebSocketMainInsecure.swf"
            }
            return o(e, [{
                key: "stop",
                value: function() {
                    this.socket.disconnect()
                }
            }, {
                key: "addMatch",
                value: function(e) {
                    if (this.socket) {
                        var t = JSON.stringify({
                            token: this.token,
                            listIds: [e]
                        });
                        this.socket.emit("readyForScores", t)
                    } else this.initSocketIO([e])
                }
            }, {
                key: "start",
                value: function(e) {
                    this.initSocketIO(e)
                }
            }, {
                key: "initSocketIO",
                value: function(e) {
                    var t = this,
                        n = JSON.stringify({
                            token: this.token,
                            listIds: e
                        });
                    this.socket = s.connect(this.url), this.socket.on("score", function(e) {
                        t.receiver.accept(e)
                    }), this.socket.on("connect", function(e) {
                        console.log("livescore connect"), t.reconnected || t.socket.emit("readyForScores", n)
                    }), this.socket.on("reconnect", function() {
                        console.log("livescore reconnect"), t.reconnected = !0, t.socket.emit("readyForScores", n)
                    }), this.socket.on("disconnect", function() {
                        console.log("livescore disconnect")
                    })
                }
            }]), e
        }()
    }, {
        "socket.io-client": 34
    }],
    54: [function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.ScoreboardApi = void 0;
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            i = e("./SocketIOClient");
        n.ScoreboardApi = function() {
            function e(t, n, o) {
                r(this, e), this.socketIOClient = new i.SocketIOClient(t, n, o)
            }
            return o(e, [{
                key: "whenFullLogReceived",
                value: function(e) {
                    this.socketIOClient.whenFullLogReceived(e)
                }
            }, {
                key: "whenLogReceived",
                value: function(e) {
                    this.socketIOClient.whenLogReceived(e)
                }
            }, {
                key: "whenScoreboardReceived",
                value: function(e) {
                    this.socketIOClient.whenScoreboardReceived(e)
                }
            }, {
                key: "start",
                value: function() {
                    this.socketIOClient.start()
                }
            }, {
                key: "stop",
                value: function() {
                    this.socketIOClient.stop()
                }
            }]), e
        }()
    }, {
        "./SocketIOClient": 55
    }],
    55: [function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.SocketIOClient = void 0;
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            i = e("socket.io-client"),
            s = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }(i);
        n.SocketIOClient = function() {
            function e(t, n, o) {
                r(this, e), this.url = t, this.token = n || "", this.listId = o, this.reconnected = !1, this.logListeners = [], this.fullogListeners = [], this.scoreboardListeners = []
            }
            return o(e, [{
                key: "whenLogReceived",
                value: function(e) {
                    this.logListeners.push(e)
                }
            }, {
                key: "whenFullLogReceived",
                value: function(e) {
                    this.fullogListeners.push(e)
                }
            }, {
                key: "whenScoreboardReceived",
                value: function(e) {
                    this.scoreboardListeners.push(e)
                }
            }, {
                key: "stop",
                value: function() {
                    this.socket.disconnect()
                }
            }, {
                key: "start",
                value: function() {
                    var e = this,
                        t = JSON.stringify({
                            token: this.token,
                            listId: this.listId
                        });
                    return this.socket = s.connect(this.url), this.socket.on("log", function(t) {
                        e.logListeners.forEach(function(e) {
                            return e(t)
                        })
                    }), this.socket.on("fullLog", function(t) {
                        e.fullLogListeners.forEach(function(e) {
                            return e(t)
                        })
                    }), this.socket.on("scoreboard", function(t) {
                        e.scoreboardListeners.forEach(function(e) {
                            return e(t)
                        })
                    }), this.socket.on("connect", function(n) {
                        console.log("scorebot connect"), e.reconnected || e.socket.emit("readyForMatch", t)
                    }), this.socket.on("reconnect", function() {
                        console.log("scorebot reconnect"), e.reconnected = !0, e.socket.emit("readyForMatch", t)
                    }), this.socket.on("disconnect", function() {
                        console.log("scorebot disconnect")
                    }), this
                }
            }]), e
        }()
    }, {
        "socket.io-client": 34
    }]
}, {}, [49]);
