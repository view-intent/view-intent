"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_collection_1 = require("utility-collection");
const view_intent_state_1 = require("./view-intent-state");
const helper_1 = require("./helper");
const timers_1 = require("timers");
const window_history_helper_1 = require("./window-history-helper");
var Nav;
(function (Nav) {
    const self = Nav;
    let navWaiting = false;
    let lastIntent = null;
    let prevIntent = null;
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
                    timers_1.setTimeout(() => {
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
            const urlDataIntent = helper_1.Helper.toUrlDataIntent(url);
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
    const intentViewLastIntent = {};
    function intentView(intent, url, callback = null) {
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
        let instanceId = intent.instanceId;
        let viewState = null;
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
        console.log("viewState: ", viewState);
        // viewType ------------
        let viewType = intent.viewType;
        if (viewType !== null && viewType !== undefined) {
            viewType = viewType.toLowerCase();
            viewType = viewType.replace(/-/g, "");
        }
        const navState = {
            areaName: intent.areaName,
            instanceId,
            viewType: intent.viewType,
            title: intent.title,
            url: (utility_collection_1.Is.nullOrUndefined(intent.redirect) ? url : intent.redirect),
            viewState: intent.viewState,
            visibleViewStates: null,
        };
        // should replace ----------------------------
        let shouldReplace = (window.history.state === undefined || window.history.state === null || intent.replaceState === true);
        let shouldNavigate = true;
        const currentNavState = window_history_helper_1.WindowHistoryHelper.getCurrentState(); // window.history.state;
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
            const pushUrl = (!utility_collection_1.Is.nullOrUndefined(navState.url) ? navState.url : "./");
            const pushTitle = (!utility_collection_1.Is.nullOrUndefined(navState.title) ? navState.title : document.getElementsByTagName("title")[0].innerText);
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
        const intent = window_history_helper_1.WindowHistoryHelper.NavStateToIntent(state);
        if (intent !== null) {
            view_intent_state_1.ViewIntentState.Instance.processPopIntent(state);
        }
    }
    Nav.intentViewPop = intentViewPop;
})(Nav = exports.Nav || (exports.Nav = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC9uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSwyREFBNkM7QUFFN0MsMkRBQWlFO0FBQ2pFLHFDQUFrQztBQUNsQyxtQ0FBb0M7QUFDcEMsbUVBQThEO0FBRTlELElBQWlCLEdBQUcsQ0FrSm5CO0FBbEpELFdBQWlCLEdBQUc7SUFDbEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLElBQUksVUFBVSxHQUFZLEtBQUssQ0FBQztJQUNoQyxJQUFJLFVBQVUsR0FBbUIsSUFBSSxDQUFDO0lBQ3RDLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7SUFFdEMsaUJBQXdCLE1BQWU7UUFDckMsSUFBSSx1QkFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM5QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDdEYsVUFBVSxHQUFHLE1BQU0sQ0FBQztnQkFDcEIsT0FBTyxLQUFLLENBQUM7YUFDZDtpQkFBTTtnQkFDTCxJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7b0JBQ3hCLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ2xCLG1CQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNkLFVBQVUsR0FBRyxLQUFLLENBQUM7b0JBQ3JCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDUixVQUFVLEdBQUcsTUFBTSxDQUFDO29CQUNwQixPQUFPLEtBQUssQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGO1NBQ0Y7YUFBTTtZQUNMLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDcEIsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7SUF4QmUsV0FBTyxVQXdCdEIsQ0FBQTtJQUNEO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRmUsVUFBTSxTQUVyQixDQUFBO0lBR0QsZUFBc0IsU0FBcUMsSUFBSTtRQUM3RCxJQUFJLEdBQUcsR0FBa0IsSUFBSSxDQUFDO1FBQzlCLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQzNDLE1BQU0sYUFBYSxHQUFtQixlQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQzlCLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDM0MsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7Z0JBQ3JDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzthQUM1QjtZQUNELFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDekI7UUFDRCwrQ0FBK0M7UUFDL0MsMkJBQTJCO1FBQzNCLE1BQU07UUFDTiw4Q0FBOEM7UUFDOUMsMkJBQTJCO1FBQzNCLEtBQUs7SUFDUCxDQUFDO0lBbkJlLFNBQUssUUFtQnBCLENBQUE7SUFDRCxNQUFNLG9CQUFvQixHQUFRLEVBQUUsQ0FBQztJQUNyQyxvQkFBMkIsTUFBZSxFQUFFLEdBQVcsRUFBRSxXQUF5QyxJQUFJO1FBQ3BHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ2hDLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQzNDLE9BQU87U0FDUjtRQUNELElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJO1lBQ3JGLE1BQU0sQ0FBQyxRQUFRLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3JGLE9BQU87U0FDUjtRQUNELDBCQUEwQjtRQUMxQixJQUFJLFVBQVUsR0FBOEIsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUM5RCxJQUFJLFNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBQ3ZDLFNBQVMsR0FBRyxtQ0FBZSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDdEIsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztTQUN2RDtRQUNELG1GQUFtRjtRQUNuRixtR0FBbUc7UUFDbkcscUNBQXFDO1FBQ3JDLG1FQUFtRTtRQUNuRSxJQUFJO1FBQ0osdURBQXVEO1FBQ3ZELDJEQUEyRDtRQUMzRCxXQUFXO1FBQ1gsZ0RBQWdEO1FBQ2hELG1FQUFtRTtRQUNuRSxJQUFJO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFdEMsd0JBQXdCO1FBQ3hCLElBQUksUUFBUSxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDL0MsUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdkM7UUFDRCxNQUFNLFFBQVEsR0FBYztZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsVUFBVTtZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6QixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsR0FBRyxFQUFFLENBQUMsdUJBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbEUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQztRQUNGLDhDQUE4QztRQUM5QyxJQUFJLGFBQWEsR0FBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNuSSxJQUFJLGNBQWMsR0FBWSxJQUFJLENBQUM7UUFDbkMsTUFBTSxlQUFlLEdBQXFCLDJDQUFtQixDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsd0JBQXdCO1FBQ3pHLElBQUksQ0FBQyxhQUFhLElBQUksZUFBZSxFQUFFO1lBQ3JDLElBQUksUUFBUSxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUU7Z0JBQzlFLDBCQUEwQjthQUMzQjtZQUNELElBQUksZUFBZSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLEdBQUcsS0FBSyxlQUFlLENBQUMsR0FBRyxFQUFFO2dCQUNoTSxjQUFjLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxlQUFlLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUN4RixhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxRQUFRLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUN6QyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxRQUFRLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxlQUFlLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxlQUFlLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDNUgsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsS0FBSyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtvQkFDaEgsYUFBYSxHQUFHLElBQUksQ0FBQztpQkFDdEI7YUFDRjtZQUNELElBQUksZUFBZSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDcEcsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUN2QjtTQUNGO1FBQ0QsOENBQThDO1FBQzlDLElBQUksY0FBYyxFQUFFO1lBQ2xCLE1BQU0sT0FBTyxHQUFXLENBQUMsQ0FBQyx1QkFBRSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVGLE1BQU0sU0FBUyxHQUFXLENBQUMsQ0FBQyx1QkFBRSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqSixVQUFVLEdBQUksMkNBQW1CLENBQUMsZ0JBQWdCLENBQUMsMkNBQW1CLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUMxRixJQUFJLGFBQWEsRUFBRTtnQkFDakIsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDeEQ7WUFDRCxtQ0FBZSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQWxGZSxjQUFVLGFBa0Z6QixDQUFBO0lBQ0QsdUJBQThCLEtBQWdCO1FBQzVDLE1BQU0sTUFBTSxHQUFHLDJDQUFtQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixtQ0FBZSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFMZSxpQkFBYSxnQkFLNUIsQ0FBQTtBQUNILENBQUMsRUFsSmdCLEdBQUcsR0FBSCxXQUFHLEtBQUgsV0FBRyxRQWtKbkIiLCJmaWxlIjoidmlldy1pbnRlbnQvbmF2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWpheFdvcmtlciB9IGZyb20gXCJhamF4LXdvcmtlclwiO1xyXG5pbXBvcnQgKiBhcyBsb2Rhc2ggZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBwcm9jZXNzLCB0aW1lIH0gZnJvbSBcInVuaXFpZFwiO1xyXG5pbXBvcnQgeyBJcywgVXJsIH0gZnJvbSBcInV0aWxpdHktY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBJSW50ZW50LCBJTmF2U3RhdGUsIElVcmxEYXRhSW50ZW50IH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgVmlld0ludGVudFN0YXRlLCBWaWV3U3RhdGUgfSBmcm9tIFwiLi92aWV3LWludGVudC1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJcIjtcclxuaW1wb3J0IHsgc2V0VGltZW91dCB9IGZyb20gXCJ0aW1lcnNcIjtcclxuaW1wb3J0IHsgV2luZG93SGlzdG9yeUhlbHBlciB9IGZyb20gXCIuL3dpbmRvdy1oaXN0b3J5LWhlbHBlclwiO1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBOYXYge1xyXG4gIGNvbnN0IHNlbGYgPSBOYXY7XHJcbiAgbGV0IG5hdldhaXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsZXQgbGFzdEludGVudDogSUludGVudCB8IG51bGwgPSBudWxsO1xyXG4gIGxldCBwcmV2SW50ZW50OiBJSW50ZW50IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBuYXZXYWl0KGludGVudDogSUludGVudCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKElzLm51bGxPclVuZGVmaW5lZChpbnRlbnQpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChsYXN0SW50ZW50ICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChpbnRlbnQudmlld1R5cGUgIT09IGxhc3RJbnRlbnQudmlld1R5cGUgfHwgaW50ZW50LmFyZWFOYW1lICE9PSBsYXN0SW50ZW50LmFyZWFOYW1lKSB7XHJcbiAgICAgICAgbGFzdEludGVudCA9IGludGVudDtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKG5hdldhaXRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBuYXZXYWl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBuYXZXYWl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9LCAxNTApO1xyXG4gICAgICAgICAgbGFzdEludGVudCA9IGludGVudDtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXN0SW50ZW50ID0gaW50ZW50O1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBnb2JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBzdGFydCgpOiB2b2lkO1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBzdGFydChpbnRlbnQ6IElJbnRlbnQgfCBudWxsKTogdm9pZDtcclxuICBleHBvcnQgZnVuY3Rpb24gc3RhcnQoaW50ZW50OiBJSW50ZW50IHwgbnVsbCB8IHVuZGVmaW5lZCA9IG51bGwpOiB2b2lkIHtcclxuICAgIGxldCB1cmw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG4gICAgaWYgKGludGVudCA9PT0gdW5kZWZpbmVkIHx8IGludGVudCA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zdCB1cmxEYXRhSW50ZW50OiBJVXJsRGF0YUludGVudCA9IEhlbHBlci50b1VybERhdGFJbnRlbnQodXJsKTtcclxuICAgICAgaW50ZW50ID0gdXJsRGF0YUludGVudC5pbnRlbnQ7XHJcbiAgICAgIHVybCA9IHVybERhdGFJbnRlbnQudXJsO1xyXG4gICAgfVxyXG4gICAgaWYgKGludGVudCAhPT0gbnVsbCAmJiBpbnRlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAodXJsID09PSB1bmRlZmluZWQgfHwgdXJsID09PSBudWxsKSB7XHJcbiAgICAgICAgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgIH1cclxuICAgICAgaW50ZW50VmlldyhpbnRlbnQsIHVybCk7XHJcbiAgICB9XHJcbiAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIChlKSA9PiB7XHJcbiAgICAvLyBcdGludGVudFZpZXdQb3AoZS5zdGF0ZSk7XHJcbiAgICAvLyB9KTtcclxuICAgIC8vIHdpbmRvdy5vbnBvcHN0YXRlID0gKGU6IFBvcFN0YXRlRXZlbnQpID0+IHtcclxuICAgIC8vIFx0aW50ZW50Vmlld1BvcChlLnN0YXRlKTtcclxuICAgIC8vIH07XHJcbiAgfVxyXG4gIGNvbnN0IGludGVudFZpZXdMYXN0SW50ZW50OiBhbnkgPSB7fTtcclxuICBleHBvcnQgZnVuY3Rpb24gaW50ZW50VmlldyhpbnRlbnQ6IElJbnRlbnQsIHVybDogc3RyaW5nLCBjYWxsYmFjazogKChkYXRhOiBhbnkpID0+IHZvaWQpIHwgbnVsbCA9IG51bGwgKTogdm9pZCB7XHJcbiAgICBpZiAobmF2V2FpdChpbnRlbnQpKSB7IHJldHVybjsgfVxyXG4gICAgaWYgKGludGVudCA9PT0gdW5kZWZpbmVkIHx8IGludGVudCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaW50ZW50LnZpZXdUeXBlID09PSBcIlwiIHx8IGludGVudC52aWV3VHlwZSA9PT0gdW5kZWZpbmVkIHx8IGludGVudC52aWV3VHlwZSA9PT0gbnVsbCB8fFxyXG4gICAgICBpbnRlbnQuYXJlYU5hbWUgPT09IFwiXCIgfHwgaW50ZW50LmFyZWFOYW1lID09PSB1bmRlZmluZWQgfHwgaW50ZW50LmFyZWFOYW1lID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGdlbmVyYXRlIG9yIGdldEluc3RhbmNlXHJcbiAgICBsZXQgaW5zdGFuY2VJZDogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCA9IGludGVudC5pbnN0YW5jZUlkO1xyXG4gICAgbGV0IHZpZXdTdGF0ZTogVmlld1N0YXRlIHwgbnVsbCA9IG51bGw7XHJcbiAgICB2aWV3U3RhdGUgPSBWaWV3SW50ZW50U3RhdGUuSW5zdGFuY2UuZ2V0Vmlld1N0YXRlQnlJbnRlbnQoaW50ZW50KTtcclxuICAgIGlmICh2aWV3U3RhdGUgIT09IG51bGwpIHtcclxuICAgICAgaW50ZW50Lmluc3RhbmNlSWQgPSBpbnN0YW5jZUlkID0gdmlld1N0YXRlLmluc3RhbmNlSWQ7XHJcbiAgICB9XHJcbiAgICAvLyBpZiAoaW5zdGFuY2VJZCA9PT0gbnVsbCB8fCBpbnN0YW5jZUlkID09PSB1bmRlZmluZWQgfHwgaW5zdGFuY2VJZCA9PT0gXCJsYXN0XCIpIHsgXHJcbiAgICAvLyAgIHZpZXdTdGF0ZSA9IFZpZXdJbnRlbnRTdGF0ZS5JbnN0YW5jZS5nZXRMYXN0Vmlld1N0YXRlQnlUeXBlKGludGVudC5hcmVhTmFtZSwgaW50ZW50LnZpZXdUeXBlKTtcclxuICAgIC8vIH0gZWxzZSBpZiAoaW5zdGFuY2VJZCAhPT0gXCJuZXdcIikge1xyXG4gICAgLy8gICB2aWV3U3RhdGUgPSBWaWV3SW50ZW50U3RhdGUuSW5zdGFuY2UuZ2V0Vmlld1N0YXRlQnlJZChpbnRlbnQpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gaWYgKHZpZXdTdGF0ZSAhPT0gbnVsbCAmJiB2aWV3U3RhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgLy8gICBpbnRlbnQuaW5zdGFuY2VJZCA9IGluc3RhbmNlSWQgPSB2aWV3U3RhdGUuaW5zdGFuY2VJZDtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIGludGVudC5pbnN0YW5jZUlkID0gaW5zdGFuY2VJZCA9IHByb2Nlc3MoKTtcclxuICAgIC8vICAgdmlld1N0YXRlID0gVmlld0ludGVudFN0YXRlLkluc3RhbmNlLmdldFZpZXdTdGF0ZUJ5SWQoaW50ZW50KTtcclxuICAgIC8vIH1cclxuICAgIGNvbnNvbGUubG9nKFwidmlld1N0YXRlOiBcIiwgdmlld1N0YXRlKTtcclxuICAgIFxyXG4gICAgLy8gdmlld1R5cGUgLS0tLS0tLS0tLS0tXHJcbiAgICBsZXQgdmlld1R5cGU6IHN0cmluZyA9IGludGVudC52aWV3VHlwZTtcclxuICAgIGlmICh2aWV3VHlwZSAhPT0gbnVsbCAmJiB2aWV3VHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHZpZXdUeXBlID0gdmlld1R5cGUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgdmlld1R5cGUgPSB2aWV3VHlwZS5yZXBsYWNlKC8tL2csIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbmF2U3RhdGU6IElOYXZTdGF0ZSA9IHtcclxuICAgICAgYXJlYU5hbWU6IGludGVudC5hcmVhTmFtZSxcclxuICAgICAgaW5zdGFuY2VJZCxcclxuICAgICAgdmlld1R5cGU6IGludGVudC52aWV3VHlwZSxcclxuICAgICAgdGl0bGU6IGludGVudC50aXRsZSxcclxuICAgICAgdXJsOiAoSXMubnVsbE9yVW5kZWZpbmVkKGludGVudC5yZWRpcmVjdCkgPyB1cmwgOiBpbnRlbnQucmVkaXJlY3QpLFxyXG4gICAgICB2aWV3U3RhdGU6IGludGVudC52aWV3U3RhdGUsXHJcbiAgICAgIHZpc2libGVWaWV3U3RhdGVzOiBudWxsLFxyXG4gICAgfTtcclxuICAgIC8vIHNob3VsZCByZXBsYWNlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGxldCBzaG91bGRSZXBsYWNlOiBib29sZWFuID0gKHdpbmRvdy5oaXN0b3J5LnN0YXRlID09PSB1bmRlZmluZWQgfHwgd2luZG93Lmhpc3Rvcnkuc3RhdGUgPT09IG51bGwgfHwgaW50ZW50LnJlcGxhY2VTdGF0ZSA9PT0gdHJ1ZSk7XHJcbiAgICBsZXQgc2hvdWxkTmF2aWdhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgY29uc3QgY3VycmVudE5hdlN0YXRlOiBJTmF2U3RhdGUgfCBudWxsID0gV2luZG93SGlzdG9yeUhlbHBlci5nZXRDdXJyZW50U3RhdGUoKTsgLy8gd2luZG93Lmhpc3Rvcnkuc3RhdGU7XHJcbiAgICBpZiAoIXNob3VsZFJlcGxhY2UgJiYgY3VycmVudE5hdlN0YXRlKSB7XHJcbiAgICAgIGlmIChuYXZTdGF0ZS51cmwgPT09IG51bGwgfHwgbmF2U3RhdGUudXJsID09PSB1bmRlZmluZWQgfHwgbmF2U3RhdGUudXJsID09PSBcIlwiKSB7XHJcbiAgICAgICAgLy8gc2hvdWxkTmF2aWdhdGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY3VycmVudE5hdlN0YXRlLnZpZXdUeXBlID09PSBuYXZTdGF0ZS52aWV3VHlwZSAmJiBjdXJyZW50TmF2U3RhdGUuYXJlYU5hbWUgPT09IG5hdlN0YXRlLmFyZWFOYW1lICYmIGN1cnJlbnROYXZTdGF0ZS52aWV3U3RhdGUgPT09IG5hdlN0YXRlLnZpZXdTdGF0ZSAmJiBuYXZTdGF0ZS51cmwgPT09IGN1cnJlbnROYXZTdGF0ZS51cmwpIHtcclxuICAgICAgICBzaG91bGROYXZpZ2F0ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjdXJyZW50TmF2U3RhdGUudXJsID09PSBuYXZTdGF0ZS51cmwgJiYgY3VycmVudE5hdlN0YXRlLnZpZXdUeXBlID09PSBpbnRlbnQudmlld1R5cGUpIHtcclxuICAgICAgICBzaG91bGRSZXBsYWNlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmF2U3RhdGUudXJsID09PSB3aW5kb3cubG9jYXRpb24uaHJlZikge1xyXG4gICAgICAgIHNob3VsZFJlcGxhY2UgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYXZTdGF0ZS51cmwgIT09IG51bGwgJiYgbmF2U3RhdGUudXJsICE9PSB1bmRlZmluZWQgJiYgY3VycmVudE5hdlN0YXRlLnVybCAhPT0gbnVsbCAmJiBjdXJyZW50TmF2U3RhdGUudXJsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAobmF2U3RhdGUudXJsLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLm9yaWdpbiwgXCJcIikgPT09IGN1cnJlbnROYXZTdGF0ZS51cmwucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ub3JpZ2luLCBcIlwiKSkge1xyXG4gICAgICAgICAgc2hvdWxkUmVwbGFjZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChjdXJyZW50TmF2U3RhdGUuYXJlYU5hbWUgIT09IG5hdlN0YXRlLmFyZWFOYW1lIHx8IGN1cnJlbnROYXZTdGF0ZS52aWV3VHlwZSAhPT0gbmF2U3RhdGUudmlld1R5cGUpIHtcclxuICAgICAgICBzaG91bGRSZXBsYWNlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHB1c2ggb3IgcmVwbGFjZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmIChzaG91bGROYXZpZ2F0ZSkge1xyXG4gICAgICBjb25zdCBwdXNoVXJsOiBzdHJpbmcgPSAoIUlzLm51bGxPclVuZGVmaW5lZChuYXZTdGF0ZS51cmwpID8gbmF2U3RhdGUudXJsIGFzIHN0cmluZyA6IFwiLi9cIik7XHJcbiAgICAgIGNvbnN0IHB1c2hUaXRsZTogc3RyaW5nID0gKCFJcy5udWxsT3JVbmRlZmluZWQobmF2U3RhdGUudGl0bGUpID8gbmF2U3RhdGUudGl0bGUgYXMgc3RyaW5nIDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0aXRsZVwiKVswXS5pbm5lclRleHQpO1xyXG4gICAgICBwcmV2SW50ZW50ID0gIFdpbmRvd0hpc3RvcnlIZWxwZXIuTmF2U3RhdGVUb0ludGVudChXaW5kb3dIaXN0b3J5SGVscGVyLmdldEN1cnJlbnRTdGF0ZSgpKTtcclxuICAgICAgaWYgKHNob3VsZFJlcGxhY2UpIHtcclxuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShuYXZTdGF0ZSwgcHVzaFRpdGxlLCBwdXNoVXJsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobmF2U3RhdGUsIHB1c2hUaXRsZSwgcHVzaFVybCk7XHJcbiAgICAgIH1cclxuICAgICAgVmlld0ludGVudFN0YXRlLkluc3RhbmNlLnByb2Nlc3NJbnRlbnQoaW50ZW50LCBwdXNoVXJsKTtcclxuICAgIH1cclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGludGVudFZpZXdQb3Aoc3RhdGU6IElOYXZTdGF0ZSk6IHZvaWQge1xyXG4gICAgY29uc3QgaW50ZW50ID0gV2luZG93SGlzdG9yeUhlbHBlci5OYXZTdGF0ZVRvSW50ZW50KHN0YXRlKTtcclxuICAgIGlmIChpbnRlbnQgIT09IG51bGwpIHtcclxuICAgICAgVmlld0ludGVudFN0YXRlLkluc3RhbmNlLnByb2Nlc3NQb3BJbnRlbnQoc3RhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
