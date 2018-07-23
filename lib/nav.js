import { Is, Url } from "utility-collection";
import { ViewIntentState, WindowHistoryHelper } from "./view-intent-state";
import { Helper } from "./helper";
import { setTimeout } from "timers";
// import { WindowHistoryHelper } from "./window-history-helper";
// console.log("windowH", WindowHistoryHelper);
export var Nav;
(function (Nav) {
    var self = Nav;
    var navWaiting = false;
    var lastIntent = null;
    var prevIntent = null;
    function navWait(intent) {
        if (Is.nullOrUndefined(intent)) {
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
                    setTimeout(function () {
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
            var urlDataIntent = Helper.toUrlDataIntent(url);
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
        //   intentView( Helper.navStateToIntent(e.state), e.state.url);
        //   // intentViewPop(e.state);
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
        viewState = ViewIntentState.Instance.getViewStateByIntent(intent);
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
            title: intent.title,
            url: (Is.nullOrUndefined(intent.redirect) ? url : intent.redirect),
            viewState: intent.viewState,
            viewType: intent.viewType,
            visibleViewStates: null,
        };
        // should replace ----------------------------
        var shouldReplace = (window.history.state === undefined || window.history.state === null || intent.replaceState === true);
        var shouldNavigate = true;
        var currentNavState = WindowHistoryHelper.getCurrentState(); // window.history.state;
        if (!shouldReplace && currentNavState) {
            if (navState.url === null || navState.url === undefined || navState.url === "") {
                shouldNavigate = false;
            }
            if (currentNavState.viewType === navState.viewType && currentNavState.areaName === navState.areaName && currentNavState.viewState === navState.viewState && navState.url === currentNavState.url) {
                // shouldNavigate = false;
                shouldReplace = true;
            }
            if (currentNavState.areaName === navState.areaName && currentNavState.viewType === intent.viewType) {
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
        }
        // push or replace ---------------------------
        if (shouldNavigate || true) {
            var pushUrl = (!Is.nullOrUndefined(navState.url) ? navState.url : "./");
            var pushTitle = (!Is.nullOrUndefined(navState.title) ? navState.title : document.getElementsByTagName("title")[0].innerText);
            var newPushUrl = new Url(pushUrl);
            newPushUrl.setOrigin(window.location.origin, false);
            pushUrl = newPushUrl.toString();
            prevIntent = WindowHistoryHelper.NavStateToIntent(WindowHistoryHelper.getCurrentState());
            if (shouldReplace) {
                history.replaceState(navState, pushTitle, pushUrl);
            }
            else {
                window.history.pushState(navState, pushTitle, pushUrl);
            }
            ViewIntentState.Instance.processIntent(intent, pushUrl);
        }
    }
    Nav.intentView = intentView;
    function intentViewPop(state) {
        var intent = WindowHistoryHelper.NavStateToIntent(state);
        if (intent !== null) {
            ViewIntentState.Instance.processPopIntent(state);
            ViewIntentState.Instance.processIntent(intent);
        }
    }
    Nav.intentViewPop = intentViewPop;
})(Nav || (Nav = {}));
//# sourceMappingURL=nav.js.map