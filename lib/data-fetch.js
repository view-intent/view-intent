import { AjaxWorker } from "ajax-worker";
import { Nav } from "./nav";
import { Url, Is } from "utility-collection";
import { StateRoot } from "./state-root";
import { Helper } from "./helper";
//
export var DataFetch;
(function (DataFetch) {
    const isReactNative = false;
    // function intentViewFromUrl(url: string): void {
    // 	const urlDataIntent = Helper.toUrlDataIntent(url);
    // 	if (urlDataIntent.intent !== null) {
    // 		Nav.intentView(urlDataIntent.intent, urlDataIntent.url);
    // 	}
    // }
    function get(url, data = null) {
        const u = new Url(url);
        u.setQueries(data);
        genericFetch(url, "get");
    }
    DataFetch.get = get;
    function post(url, data = {}) {
        genericFetch(url, "post", data);
    }
    DataFetch.post = post;
    function put(url, data = {}) {
        genericFetch(url, "put", data);
    }
    DataFetch.put = put;
    function patch(url, data = {}) {
        genericFetch(url, "patch", data);
    }
    DataFetch.patch = patch;
    function del(url, data = {}) {
        const u = new Url("url");
        u.setQueries(data);
        genericFetch(url, "delete");
    }
    DataFetch.del = del;
    function genericFetch(url, method, data = {}) {
        let viewIntentedPushed = false;
        const urlDataIntent = Helper.toUrlDataIntent(url);
        if (!Is.nullOrUndefined(urlDataIntent.intent)) {
            if (!Is.nullOrUndefined(urlDataIntent.intent.viewType) && !Is.nullOrUndefined(urlDataIntent.intent.areaName)) {
                viewIntentedPushed = true;
                Nav.intentView(urlDataIntent.intent, urlDataIntent.url);
            }
        }
        if (urlDataIntent.url !== null && urlDataIntent.url !== undefined && urlDataIntent.url !== "") {
            // console.warn("TODO: increment the loader count here.");
            AjaxWorker.fetch({
                id: method !== "get" ? undefined : "getviewintentfetch",
                url: urlDataIntent.url,
                body: method !== "get" && method !== "delete" ? data : undefined,
                method,
                headers: [
                    ["request", "state"],
                    ["Accept", "application/json"],
                    ["Content-Type", "application/json"],
                ],
                onSuccess: (response) => {
                    if (!viewIntentedPushed || response.redirected) {
                        Nav.intentView(response.data.intent, response.urlRedirected);
                    }
                    if (!Is.nullOrUndefined(response.data.intent)) {
                        if (!Is.nullOrUndefined(response.data.intent.redirect)) {
                            setImmediate(() => {
                                DataFetch.get(response.data.intent.redirect);
                            });
                        }
                    }
                    StateRoot.applyStatesRoots(response.data.states);
                },
                onAbort: (response) => {
                    // console.error("aborted request", response);
                },
                onError: (response) => {
                    // console.error("error request", response);
                },
                onDone: (response) => {
                    // console.error("done request", response);
                    // console.warn("TODO: decrease the loader counter here.");
                },
            });
        }
    }
})(DataFetch || (DataFetch = {}));
export default DataFetch;
//# sourceMappingURL=data-fetch.js.map