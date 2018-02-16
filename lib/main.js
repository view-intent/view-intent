import * as mobx from "mobx";
import { ViewTypeStore } from "./view-type-store";
import { Nav } from "./nav";
import { Helper } from "./helper";
import { ViewNotFound } from "./view-error";
import { StateRoot } from "./state-root";
import { ViewRoot } from "./view-root";
import { DataFetch } from "./data-fetch";
import { Is } from "utility-collection";
import { ViewIntentDom } from "./view-intent-dom";
//
export { View } from "./view";
export { ViewFrame } from "./view-frame";
export * from "./data-fetch";
mobx.extras.isolateGlobalState();
export var ViewIntent;
(function (ViewIntent) {
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
    function registerViewType(viewInfo) {
        ViewTypeStore.registerViewType(viewInfo);
    }
    ViewIntent.registerViewType = registerViewType;
    function init(element, intent = null) {
        ViewRoot.htmlInit(intent, element);
        Nav.start(intent);
        DataFetch.get(window.location.href);
        ViewIntentDom.init();
    }
    ViewIntent.init = init;
    function registerStateRoot(stateName, stateRootInstance) {
        return StateRoot.registerStateRoot(stateName, stateRootInstance);
    }
    ViewIntent.registerStateRoot = registerStateRoot;
})(ViewIntent || (ViewIntent = {}));
ViewIntent.registerViewType(ViewNotFound.viewInfo);
export default ViewIntent;
//# sourceMappingURL=main.js.map