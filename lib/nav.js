import { AjaxWorker } from "ajax-worker";
import { process } from "uniqid";
import { ViewIntentState } from "./view-intent-state";
export var Nav;
(function (Nav) {
    var self = Nav;
    function intentViewAndRequest(url, intent) {
        if (intent === void 0) { intent = null; }
        if (intent !== null) {
            self.intentView(intent, url);
        }
        AjaxWorker.fetch({
            url: url,
            headers: [
                ["request", "state"],
            ],
            onSuccess: function (response) {
                // console.log(response.data);
                Nav.intentView(response.data.intent, response.urlRedirected);
            },
            onAbort: function (request) {
                console.warn("aborted request", request);
            },
            onError: function (response) {
                console.error("error request", response);
            },
        });
    }
    Nav.intentViewAndRequest = intentViewAndRequest;
    function intentViewAndPost(url, data, intent) {
        if (intent === void 0) { intent = null; }
        if (intent !== null) {
            self.intentView(intent, url);
        }
        AjaxWorker.fetch({
            url: url,
            method: "POST",
            headers: [
                ["request", "state"],
            ],
            onSuccess: function (response) {
                Nav.intentView(response.data.intent, response.urlRedirected);
                // console.log("sucess -----");
            },
            onAbort: function (request) {
                console.warn("aborted request", request);
            },
            onError: function (response) {
                console.error("error request", response);
            },
        });
    }
    Nav.intentViewAndPost = intentViewAndPost;
    function goback() {
        window.history.back();
    }
    Nav.goback = goback;
    function start(intent) {
        var url = window.location.href;
        window.onpopstate = function (e) {
            intentViewPop(e.state);
        };
        self.intentViewAndRequest(window.location.href, intent);
    }
    Nav.start = start;
    function intentView(intent, url, title) {
        if (title === void 0) { title = null; }
        if (intent === undefined || intent === null) {
            return;
        }
        var instanceId = intent.instanceId;
        if (instanceId === null || instanceId === undefined) {
            instanceId = process();
        }
        var viewType = intent.viewType;
        if (viewType !== null && viewType !== undefined) {
            viewType = viewType.toLowerCase();
            viewType = viewType.replace(/-/g, "");
        }
        var navState = {
            areaName: intent.areaName,
            instanceId: instanceId,
            viewType: intent.viewType,
            title: title,
            url: url,
            viewState: intent.viewState,
        };
        // should replace ----------------------------
        var shouldReplace = (window.history.state === undefined || window.history.state === null);
        var currentNavState = window.history.state;
        if (!shouldReplace) {
            if (intent.instanceId === "last" && currentNavState.viewType === intent.viewType) {
                shouldReplace = true;
            }
            if (navState.url === null || navState.url === undefined) {
                shouldReplace = true;
            }
            if (currentNavState.url === navState.url) {
                shouldReplace = true;
            }
            if (navState.url === window.location.href) {
                shouldReplace = true;
            }
        }
        // push or replace ---------------------------
        if (shouldReplace) {
            history.replaceState(navState, navState.title, navState.url);
        }
        else {
            window.history.pushState(navState, navState.title, navState.url);
        }
        ViewIntentState.Instance.processIntent(intent);
    }
    Nav.intentView = intentView;
    function intentViewPop(state) {
        if (state !== null && state !== undefined) {
            var intent = {
                areaName: state.areaName,
                instanceId: state.instanceId,
                viewType: state.viewType,
                viewState: state.viewState,
            };
            ViewIntentState.Instance.processIntent(intent);
        }
    }
    Nav.intentViewPop = intentViewPop;
})(Nav || (Nav = {}));
//# sourceMappingURL=nav.js.map