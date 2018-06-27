"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_collection_1 = require("utility-collection");
var view_intent_state_1 = require("./view-intent-state");
var helper_1 = require("./helper");
var timers_1 = require("timers");
var window_history_helper_1 = require("./window-history-helper");
var Nav;
(function (Nav) {
    var self = Nav;
    var navWaiting = false;
    var lastIntent = null;
    var prevIntent = null;
    function navWait(intent) {
        if (utility_collection_1.Is.nullOrUndefined(intent)) {
            return false;
        }
        if (lastIntent !== null) {
            if (intent.viewType !== lastIntent.viewType || intent.areaName !== lastIntent.areaName) {
                lastIntent = intent;
                return false;
            }
            else {
                if (navWaiting === false) {
                    navWaiting = true;
                    timers_1.setTimeout(function () {
                        navWaiting = false;
                    }, 150);
                    lastIntent = intent;
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        else {
            lastIntent = intent;
            return false;
        }
    }
    Nav.navWait = navWait;
    function goback() {
        window.history.back();
    }
    Nav.goback = goback;
    function start(intent) {
        if (intent === void 0) { intent = null; }
        var url = null;
        if (intent === undefined || intent === null) {
            var urlDataIntent = helper_1.Helper.toUrlDataIntent(url);
            intent = urlDataIntent.intent;
            url = urlDataIntent.url;
        }
        if (intent !== null && intent !== undefined) {
            if (url === undefined || url === null) {
                url = window.location.href;
            }
            intentView(intent, url);
        }
        // window.addEventListener("popstate", (e) => {
        // 	intentViewPop(e.state);
        // });
        // window.onpopstate = (e: PopStateEvent) => {
        // 	intentViewPop(e.state);
        // };
    }
    Nav.start = start;
    var intentViewLastIntent = {};
    function intentView(intent, url, callback) {
        if (callback === void 0) { callback = null; }
        if (navWait(intent)) {
            return;
        }
        if (intent === undefined || intent === null) {
            return;
        }
        if (intent.viewType === "" || intent.viewType === undefined || intent.viewType === null ||
            intent.areaName === "" || intent.areaName === undefined || intent.areaName === null) {
            return;
        }
        // generate or getInstance
        var instanceId = intent.instanceId;
        var viewState = null;
        viewState = view_intent_state_1.ViewIntentState.Instance.getViewStateByIntent(intent);
        if (viewState !== null) {
            intent.instanceId = instanceId = viewState.instanceId;
        }
        // if (instanceId === null || instanceId === undefined || instanceId === "last") { 
        //   viewState = ViewIntentState.Instance.getLastViewStateByType(intent.areaName, intent.viewType);
        // } else if (instanceId !== "new") {
        //   viewState = ViewIntentState.Instance.getViewStateById(intent);
        // }
        // if (viewState !== null && viewState !== undefined) {
        //   intent.instanceId = instanceId = viewState.instanceId;
        // } else {
        //   intent.instanceId = instanceId = process();
        //   viewState = ViewIntentState.Instance.getViewStateById(intent);
        // }
        // console.log("viewState: ", viewState);
        // viewType ------------
        var viewType = intent.viewType;
        if (viewType !== null && viewType !== undefined) {
            viewType = viewType.toLowerCase();
            viewType = viewType.replace(/-/g, "");
        }
        var navState = {
            areaName: intent.areaName,
            instanceId: instanceId,
            viewType: intent.viewType,
            title: intent.title,
            url: (utility_collection_1.Is.nullOrUndefined(intent.redirect) ? url : intent.redirect),
            viewState: intent.viewState,
            visibleViewStates: null,
        };
        // should replace ----------------------------
        var shouldReplace = (window.history.state === undefined || window.history.state === null || intent.replaceState === true);
        var shouldNavigate = true;
        var currentNavState = window_history_helper_1.WindowHistoryHelper.getCurrentState(); // window.history.state;
        if (!shouldReplace && currentNavState) {
            if (navState.url === null || navState.url === undefined || navState.url === "") {
                // shouldNavigate = false;
            }
            if (currentNavState.viewType === navState.viewType && currentNavState.areaName === navState.areaName && currentNavState.viewState === navState.viewState && navState.url === currentNavState.url) {
                shouldNavigate = false;
            }
            if (currentNavState.url === navState.url && currentNavState.viewType === intent.viewType) {
                shouldReplace = true;
            }
            if (navState.url === window.location.href) {
                shouldReplace = true;
            }
            if (navState.url !== null && navState.url !== undefined && currentNavState.url !== null && currentNavState.url !== undefined) {
                if (navState.url.replace(window.location.origin, "") === currentNavState.url.replace(window.location.origin, "")) {
                    shouldReplace = true;
                }
            }
            if (currentNavState.areaName !== navState.areaName || currentNavState.viewType !== navState.viewType) {
                shouldReplace = false;
            }
        }
        // push or replace ---------------------------
        if (shouldNavigate) {
            var pushUrl = (!utility_collection_1.Is.nullOrUndefined(navState.url) ? navState.url : "./");
            var pushTitle = (!utility_collection_1.Is.nullOrUndefined(navState.title) ? navState.title : document.getElementsByTagName("title")[0].innerText);
            var newPushUrl = new utility_collection_1.Url(pushUrl);
            newPushUrl.setOrigin(window.location.origin, false);
            pushUrl = newPushUrl.toString();
            prevIntent = window_history_helper_1.WindowHistoryHelper.NavStateToIntent(window_history_helper_1.WindowHistoryHelper.getCurrentState());
            if (shouldReplace) {
                history.replaceState(navState, pushTitle, pushUrl);
            }
            else {
                window.history.pushState(navState, pushTitle, pushUrl);
            }
            view_intent_state_1.ViewIntentState.Instance.processIntent(intent, pushUrl);
        }
    }
    Nav.intentView = intentView;
    function intentViewPop(state) {
        var intent = window_history_helper_1.WindowHistoryHelper.NavStateToIntent(state);
        if (intent !== null) {
            view_intent_state_1.ViewIntentState.Instance.processPopIntent(state);
        }
    }
    Nav.intentViewPop = intentViewPop;
})(Nav = exports.Nav || (exports.Nav = {}));
//# sourceMappingURL=nav.js.map