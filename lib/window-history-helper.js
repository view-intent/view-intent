"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_collection_1 = require("utility-collection");
var WindowHistoryHelper;
(function (WindowHistoryHelper) {
    function getCurrentState() {
        var currentNavState = window.history.state;
        if (currentNavState && currentNavState.areaName && currentNavState.viewType && currentNavState.instanceId) {
            return currentNavState;
        }
        else {
            return null;
        }
    }
    WindowHistoryHelper.getCurrentState = getCurrentState;
    function setCurrentStateViewAddresses(viewAddress) {
        var currentState = getCurrentState();
        if (currentState) {
            currentState.visibleViewStates = viewAddress;
            var newUrl = void 0;
            if (currentState.url !== undefined && currentState.url !== null) {
                var urlMaker = new utility_collection_1.Url(currentState.url);
                urlMaker.setOrigin(window.location.origin, false);
                newUrl = urlMaker.toString();
            }
            else {
                newUrl = currentState.url;
            }
            window.history.replaceState(currentState, currentState.title || undefined, newUrl);
        }
    }
    WindowHistoryHelper.setCurrentStateViewAddresses = setCurrentStateViewAddresses;
    function NavStateToIntent(state) {
        if (state === null || state === undefined) {
            return null;
        }
        else {
            var intent = {
                areaName: state.areaName,
                instanceId: state.instanceId,
                viewType: state.viewType,
                viewState: state.viewState,
            };
            return intent;
        }
    }
    WindowHistoryHelper.NavStateToIntent = NavStateToIntent;
})(WindowHistoryHelper = exports.WindowHistoryHelper || (exports.WindowHistoryHelper = {}));
//# sourceMappingURL=window-history-helper.js.map