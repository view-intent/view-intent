"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uniqid_1 = require("uniqid");
var view_intent_state_1 = require("./view-intent-state");
var helper_1 = require("./helper");
var Nav;
(function (Nav) {
    var self = Nav;
    function goback() {
        window.history.back();
    }
    Nav.goback = goback;
    function start(intent) {
        if (intent === void 0) { intent = null; }
        var url;
        if (intent === undefined || intent === null) {
            var urlDataIntent = helper_1.Helper.toUrlDataIntent(url);
            intent = urlDataIntent.intent;
            url = urlDataIntent.url;
        }
        if (intent !== null && intent !== undefined) {
            if (url === undefined || url === null) {
                url = window.location.href;
            }
            intentView(intent, url, intent.title);
        }
        window.onpopstate = function (e) {
            intentViewPop(e.state);
        };
    }
    Nav.start = start;
    function intentView(intent, url, title) {
        if (title === void 0) { title = null; }
        if (intent === undefined || intent === null) {
            return;
        }
        var instanceId = intent.instanceId;
        if (instanceId === null || instanceId === undefined) {
            instanceId = uniqid_1.process();
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
        view_intent_state_1.ViewIntentState.Instance.processIntent(intent);
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
            view_intent_state_1.ViewIntentState.Instance.processIntent(intent);
        }
    }
    Nav.intentViewPop = intentViewPop;
})(Nav = exports.Nav || (exports.Nav = {}));
//# sourceMappingURL=nav.js.map