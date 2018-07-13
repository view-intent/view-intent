import { Url } from "utility-collection";
export var WindowHistoryHelper2;
(function (WindowHistoryHelper2) {
    function getCurrentState() {
        var currentNavState = window.history.state;
        if (currentNavState && currentNavState.areaName && currentNavState.viewType && currentNavState.instanceId) {
            return currentNavState;
        }
        else {
            return null;
        }
    }
    WindowHistoryHelper2.getCurrentState = getCurrentState;
    function setCurrentStateViewAddresses(viewAddress) {
        var currentState = getCurrentState();
        if (currentState) {
            currentState.visibleViewStates = viewAddress;
            var newUrl = void 0;
            if (currentState.url !== undefined && currentState.url !== null) {
                var urlMaker = new Url(currentState.url);
                urlMaker.setOrigin(window.location.origin, false);
                newUrl = urlMaker.toString();
            }
            else {
                newUrl = currentState.url;
            }
            window.history.replaceState(currentState, currentState.title || undefined, newUrl);
        }
    }
    WindowHistoryHelper2.setCurrentStateViewAddresses = setCurrentStateViewAddresses;
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
    WindowHistoryHelper2.NavStateToIntent = NavStateToIntent;
})(WindowHistoryHelper2 || (WindowHistoryHelper2 = {}));
//# sourceMappingURL=window-history-helper.js.map