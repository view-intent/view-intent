import { ViewTypeStore } from "./view-type-store";
import { Nav } from "./nav";
import { Helper } from "./helper";
import { ViewNotFound } from "./view-error";
import { RootStore } from "./state-root";
import { ViewRoot } from "./view-root";
import { DataFetch } from "./data-fetch";
import { Is } from "utility-collection";
import { ViewIntentDom } from "./view-intent-dom";
//
export { View } from "./view";
export { ViewFrame } from "./view-frame";
export * from "./data-fetch";
// mobx.extras.isolateGlobalState();
export var ViewIntent;
(function (ViewIntent) {
    function config(config) {
        // DataFetch.origin = config.origin;
        init(config.element);
    }
    ViewIntent.config = config;
    ViewIntent.get = DataFetch.get;
    ViewIntent.post = DataFetch.post;
    ViewIntent.put = DataFetch.put;
    ViewIntent.patch = DataFetch.patch;
    ViewIntent.del = DataFetch.del;
    function intentView(intentOrUrl, viewState = null) {
        const intent = Helper.pathToIntent(intentOrUrl, viewState);
        const url = Helper.removeSharp(intentOrUrl);
        if (!Is.empty(url) && !Is.nullOrUndefined(url)) {
            DataFetch.get(url);
        }
        if (intent != null) {
            Nav.intentView(intent, url);
        }
    }
    ViewIntent.intentView = intentView;
    // #endregion
    // #region
    function registerViewType(viewInfo) {
        if (viewInfo.area === undefined || viewInfo.area === null) {
            viewInfo.area = "global";
        }
        if (viewInfo.require === undefined || viewInfo.require === null) {
            viewInfo.require = [];
        }
        for (let i = 0; i < viewInfo.require.length; i++) {
            if (viewInfo.require[i].indexOf("#") === 0) {
                viewInfo.require[i] = viewInfo.require[i].replace("#", "");
            }
            if (viewInfo.require[i].indexOf(".") < 0) {
                viewInfo.require[i] = "global." + viewInfo.require[i];
            }
        }
        ViewTypeStore.registerViewType(viewInfo);
    }
    ViewIntent.registerViewType = registerViewType;
    function init(element, intent = null, hotLoader = true) {
        ViewRoot.htmlInit(intent, element, hotLoader);
        Nav.start(intent);
        DataFetch.get(window.location.href);
        ViewIntentDom.init();
        window.addEventListener("popstate", (e) => {
            Nav.intentViewPop(e.state);
            // DataFetch.get(window.location.href); // best without
        });
    }
    ViewIntent.init = init;
    function registerRootStore(stateName, stateRootInstance) {
        return RootStore.registerRootStore(stateName, stateRootInstance);
    }
    ViewIntent.registerRootStore = registerRootStore;
    function getRootStore(stateName, stateRootClass) {
        if (RootStore.getRootStore(stateName) !== undefined && RootStore.getRootStore(stateName) !== null) {
            return RootStore.getRootStore(stateName);
        }
        else {
            if (stateRootClass !== undefined) {
                return RootStore.registerRootStore(stateName, new stateRootClass());
            }
        }
    }
    ViewIntent.getRootStore = getRootStore;
})(ViewIntent || (ViewIntent = {}));
ViewIntent.registerViewType(ViewNotFound.viewInfo);
export default ViewIntent;
//# sourceMappingURL=main.js.map