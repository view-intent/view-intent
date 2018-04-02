var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AjaxWorker } from "ajax-worker";
import { Nav } from "./nav";
import { Url, Is } from "utility-collection";
import { RootStore } from "./state-root";
import { Helper } from "./helper";
import { process as uniq } from "uniqid";
// import {} from "ts-seriali"
//
export var DataFetch;
(function (DataFetch) {
    const isReactNative = false;
    function get(url, data = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const u = new Url(url);
            u.setQueries(data);
            return yield genericFetch(url, "get");
        });
    }
    DataFetch.get = get;
    function post(url, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genericFetch(url, "post", data);
        });
    }
    DataFetch.post = post;
    function put(url, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genericFetch(url, "put", data);
        });
    }
    DataFetch.put = put;
    function patch(url, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genericFetch(url, "patch", data);
        });
    }
    DataFetch.patch = patch;
    function del(url, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const u = new Url("url");
            u.setQueries(data);
            return yield genericFetch(url, "delete");
        });
    }
    DataFetch.del = del;
    function genericFetch(url, method, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let viewIntentedPushed = false;
                const urlDataIntent = Helper.toUrlDataIntent(url);
                if (!Is.nullOrUndefined(urlDataIntent.intent)) {
                    if (!Is.nullOrUndefined(urlDataIntent.intent.viewType) && !Is.nullOrUndefined(urlDataIntent.intent.areaName)) {
                        viewIntentedPushed = true;
                        Nav.intentView(urlDataIntent.intent, urlDataIntent.url);
                    }
                }
                if (urlDataIntent.url !== null && urlDataIntent.url !== undefined && urlDataIntent.url !== "") {
                    AjaxWorker.fetch({
                        sync: true,
                        id: uniq().toString(),
                        url: urlDataIntent.url,
                        body: method !== "get" && method !== "delete" ? data : undefined,
                        method,
                        headers: [
                            ["request", "state"],
                            ["Accept", "application/json"],
                            ["Content-Type", "application/json"],
                        ],
                        onSuccess: (response) => {
                            // if is Intent
                            if (response.data.intent !== undefined && response.data.intent !== null) {
                                const data = response.data;
                                if (!response.urlRedirected.includes("p=")) {
                                    if (!viewIntentedPushed || response.redirected) {
                                        Nav.intentView(data.intent, response.urlRedirected);
                                    }
                                    if (!Is.empty(data.intent.redirect)) {
                                        setImmediate(() => __awaiter(this, void 0, void 0, function* () {
                                            resolve(yield DataFetch.get(data.intent.redirect));
                                        }));
                                    }
                                    else {
                                        setImmediate(() => __awaiter(this, void 0, void 0, function* () {
                                            resolve(response);
                                        }));
                                    }
                                    // if (!Is.empty(data.intent)) {
                                    // }
                                }
                                // contain state
                                if (response.data.states !== undefined && response.data.states !== null) {
                                    RootStore.applyStatesRoots(response.data.states);
                                }
                            }
                            else {
                                resolve(response);
                            }
                        },
                        onAbort: (response) => {
                            // console.error("aborted request", response);
                        },
                        onError: (response) => {
                            reject(response);
                            // console.error("error request", response);
                        },
                        onDone: (response) => {
                            // console.error("done request", response);
                            // console.warn("TODO: decrease the loader counter here.");
                        },
                    });
                }
            });
        });
    }
})(DataFetch || (DataFetch = {}));
export default DataFetch;
//# sourceMappingURL=data-fetch.js.map