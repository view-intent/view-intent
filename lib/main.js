import { ViewTypeStore } from "./view-type-store";
export { View } from "./view";
export { ViewFrame } from "./view-frame";
import * as mobx from "mobx";
import { Nav } from "./nav";
import { Helper } from "./helper";
import { ViewNotFound } from "./view-error";
import { StateStoreStore } from "./state-store-store";
mobx.extras.isolateGlobalState();
export var ViewIntent;
(function (ViewIntent) {
    ViewIntent.globaStateInstance = null;
    function request(url, intent, viewState) {
        if (intent === void 0) { intent = null; }
        if (viewState === void 0) { viewState = null; }
        var newIntent = Helper.pathToIntent(intent, viewState);
        if (newIntent !== null) {
            Nav.intentViewAndRequest(url, newIntent);
        }
    }
    ViewIntent.request = request;
    function post(url, data, intent, viewState) {
        if (intent === void 0) { intent = null; }
        if (viewState === void 0) { viewState = null; }
        var newIntent = Helper.pathToIntent(intent, viewState);
        if (newIntent !== null) {
            Nav.intentViewAndPost(url, data, newIntent);
        }
    }
    ViewIntent.post = post;
    // intent with string must be: areaName.ClassName:{id|"new"|"last"}
    function intentView(intent, viewState) {
        if (viewState === void 0) { viewState = null; }
        var newIntent = Helper.pathToIntent(intent, viewState);
        if (newIntent != null) {
            Nav.intentView(newIntent, null);
        }
    }
    ViewIntent.intentView = intentView;
    function setGlobalState(globalState) {
        if (this.globaStateInstance === null) {
            throw new Error("globaState wasn't registered.");
        }
        else {
            for (var stateName in globalState) {
                if (globalState.hasOwnProperty(stateName)) {
                    var state = globalState[stateName];
                    for (var actionName in state) {
                        if (state.hasOwnProperty(actionName)) {
                            var actionValue = state[actionName];
                            var action = ViewIntent.globaStateInstance[stateName][actionName];
                            action(actionValue);
                        }
                    }
                }
            }
        }
    }
    ViewIntent.setGlobalState = setGlobalState;
    function registerViewType(areaName, typeName, viewType, frameId, require) {
        if (frameId === void 0) { frameId = "root"; }
        if (require === void 0) { require = []; }
        ViewTypeStore.registerViewType(areaName, typeName, viewType, frameId, require);
    }
    ViewIntent.registerViewType = registerViewType;
    function init(intent, globalStates) {
        Nav.start(intent);
    }
    ViewIntent.init = init;
    // --------------------------------------------------
    // states -------------------------------------------
    function registerStore(storeName, store) {
        StateStoreStore.registerStore(storeName, store);
    }
    ViewIntent.registerStore = registerStore;
})(ViewIntent || (ViewIntent = {}));
ViewIntent.registerViewType("default", "ViewNotFound", ViewNotFound);
export default ViewIntent;
//# sourceMappingURL=main.js.map