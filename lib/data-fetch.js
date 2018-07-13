var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { AjaxWorker } from "ajax-worker";
import { Nav } from "./nav";
import { Url, Is } from "utility-collection";
import { RootStore } from "./state-root";
import { Helper } from "./helper";
import { process as uniq } from "uniqid";
import { Config } from "./config";
export var DataFetch;
(function (DataFetch) {
    var isReactNative = false;
    // export const get origin: string | undefined = Config.options.apiOrigin;
    function origin() {
        return Config.options.apiOrigin;
    }
    DataFetch.origin = origin;
    function processUrl(url) {
        // console.log("origin - ", (origin()));
        // console.log("processing url - ", url);
        if (origin() !== undefined) {
            // console.log("----", origin());
            var u = new Url(url);
            u.setOrigin(origin());
            return u.toString();
        }
        else {
            return url;
        }
    }
    function get(url, data) {
        if (data === void 0) { data = null; }
        return __awaiter(this, void 0, void 0, function () {
            var u;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        u = new Url(url);
                        u.setQueries(data);
                        return [4 /*yield*/, genericFetch(u.toString(), "get")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    DataFetch.get = get;
    function post(url, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genericFetch(url, "post", data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    DataFetch.post = post;
    function put(url, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genericFetch(url, "put", data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    DataFetch.put = put;
    function patch(url, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, genericFetch(url, "patch", data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    DataFetch.patch = patch;
    function del(url, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var u;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        u = new Url(url);
                        u.setQueries(data);
                        return [4 /*yield*/, genericFetch(u.toString(), "delete")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    DataFetch.del = del;
    function genericFetch(url, method, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var viewIntentedPushed = false;
                        var urlDataIntent = Helper.toUrlDataIntent(url);
                        if (!Is.nullOrUndefined(urlDataIntent.intent)) {
                            if (!Is.nullOrUndefined(urlDataIntent.intent.viewType) && !Is.nullOrUndefined(urlDataIntent.intent.areaName)) {
                                viewIntentedPushed = true;
                                Nav.intentView(urlDataIntent.intent, urlDataIntent.url);
                            }
                        }
                        if (urlDataIntent.url !== null && urlDataIntent.url !== undefined && urlDataIntent.url !== "") {
                            // console.log("generic fetch -", urlDataIntent);
                            AjaxWorker.fetch({
                                sync: true,
                                id: uniq().toString(),
                                url: processUrl(urlDataIntent.url),
                                body: method !== "get" && method !== "delete" ? data : undefined,
                                method: method,
                                headers: [
                                    ["Request", "State"],
                                    ["IsAjax", "true"],
                                    ["Accept", "application/json"],
                                    ["Content-Type", "application/json"],
                                ],
                                onSuccess: function (response) {
                                    // if is Intent
                                    if (response.data.intent !== undefined && response.data.intent !== null) {
                                        var data_1 = response.data;
                                        // contain state
                                        if (response.data.states !== undefined && response.data.states !== null) {
                                            RootStore.applyStatesRoots(response.data.states);
                                        }
                                        // nav
                                        if (!response.urlRedirected.includes("p=")) {
                                            if (!viewIntentedPushed || response.redirected) {
                                                Nav.intentView(data_1.intent, response.urlRedirected);
                                            }
                                            if (!Is.empty(data_1.intent.redirect)) {
                                                setImmediate(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var _a;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                _a = resolve;
                                                                return [4 /*yield*/, DataFetch.get(data_1.intent.redirect)];
                                                            case 1:
                                                                _a.apply(void 0, [_b.sent()]);
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                            }
                                            else {
                                                setImmediate(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        resolve(response);
                                                        return [2 /*return*/];
                                                    });
                                                }); });
                                            }
                                        }
                                    }
                                    else {
                                        resolve(response);
                                    }
                                },
                                onAbort: function (response) {
                                    reject(response);
                                    // console.error("aborted request", response);
                                },
                                onError: function (response) {
                                    reject(response);
                                    // console.error("error request", response);
                                },
                                onDone: function (response) {
                                    // console.error("done request", response);
                                    // console.warn("TODO: decrease the loader counter here.");
                                },
                            });
                        }
                    })];
            });
        });
    }
})(DataFetch || (DataFetch = {}));
export default DataFetch;
//# sourceMappingURL=data-fetch.js.map