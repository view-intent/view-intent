import { process } from "uniqid";
import { Is } from "utility-collection";
import { ViewIntentState } from "./view-intent-state";
import { Helper } from "./helper";
import { setTimeout } from "timers";
export var Nav;
(function (Nav) {
    const self = Nav;
    let navWaiting = false;
    let lastIntent = null;
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
                    setTimeout(() => {
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
    function start(intent = null) {
        let url = null;
        if (intent === undefined || intent === null) {
            const urlDataIntent = Helper.toUrlDataIntent(url);
            intent = urlDataIntent.intent;
            url = urlDataIntent.url;
        }
        if (intent !== null && intent !== undefined) {
            if (url === undefined || url === null) {
                url = window.location.href;
            }
            intentView(intent, url, intent.title);
        }
        // window.addEventListener("popstate", (e) => {
        // 	intentViewPop(e.state);
        // });
        // window.onpopstate = (e: PopStateEvent) => {
        // 	intentViewPop(e.state);
        // };
    }
    Nav.start = start;
    const intentViewLastIntent = {};
    function intentView(intent, url, title = null) {
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
        let instanceId = intent.instanceId;
        if (instanceId === null || instanceId === undefined) {
            instanceId = process();
        }
        let viewType = intent.viewType;
        if (viewType !== null && viewType !== undefined) {
            viewType = viewType.toLowerCase();
            viewType = viewType.replace(/-/g, "");
        }
        const navState = {
            areaName: intent.areaName,
            instanceId,
            viewType: intent.viewType,
            title,
            url: (Is.nullOrUndefined(intent.redirect) ? url : intent.redirect),
            viewState: intent.viewState,
        };
        // should replace ----------------------------
        let shouldReplace = (window.history.state === undefined || window.history.state === null);
        let shouldNavigate = true;
        const currentNavState = window.history.state;
        if (!shouldReplace) {
            if (navState.url === null || navState.url === undefined || navState.url === "") {
                shouldNavigate = false;
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
            if (navState.url.replace(window.location.origin, "") === currentNavState.url.replace(window.location.origin, "")) {
                shouldReplace = true;
            }
        }
        // push or replace ---------------------------
        if (shouldNavigate) {
            const pushUrl = (!Is.nullOrUndefined(navState.url) ? navState.url : "./");
            const pushTitle = (!Is.nullOrUndefined(navState.title) ? navState.title : document.getElementsByTagName("title")[0].innerText);
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
        if (state !== null && state !== undefined) {
            const intent = {
                areaName: state.areaName,
                instanceId: state.instanceId,
                viewType: state.viewType,
                viewState: state.viewState,
            };
            ViewIntentState.Instance.processIntent(intent, state.url);
        }
    }
    Nav.intentViewPop = intentViewPop;
})(Nav || (Nav = {}));
//# sourceMappingURL=nav.js.map