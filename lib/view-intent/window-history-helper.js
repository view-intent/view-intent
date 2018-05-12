"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WindowHistoryHelper;
(function (WindowHistoryHelper) {
    function getCurrentState() {
        const currentNavState = window.history.state;
        if (currentNavState && currentNavState.areaName && currentNavState.viewType && currentNavState.instanceId) {
            return currentNavState;
        }
        else {
            return null;
        }
    }
    WindowHistoryHelper.getCurrentState = getCurrentState;
    function setCurrentStateViewAddresses(viewAddress) {
        const currentState = getCurrentState();
        if (currentState) {
            currentState.visibleViewStates = viewAddress;
            window.history.replaceState(currentState, currentState.title || undefined, currentState.url);
        }
    }
    WindowHistoryHelper.setCurrentStateViewAddresses = setCurrentStateViewAddresses;
    function NavStateToIntent(state) {
        if (state === null || state === undefined) {
            return null;
        }
        else {
            const intent = {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC93aW5kb3ctaGlzdG9yeS1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFpQixtQkFBbUIsQ0E2Qm5DO0FBN0JELFdBQWlCLG1CQUFtQjtJQUNsQztRQUNFLE1BQU0sZUFBZSxHQUFjLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3hELElBQUksZUFBZSxJQUFJLGVBQWUsQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFO1lBQ3pHLE9BQU8sZUFBZSxDQUFDO1NBQ3hCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQVBlLG1DQUFlLGtCQU85QixDQUFBO0lBQ0Qsc0NBQTZDLFdBQXFCO1FBQ2hFLE1BQU0sWUFBWSxHQUFHLGVBQWUsRUFBRSxDQUFDO1FBQ3ZDLElBQUksWUFBWSxFQUFFO1lBQ2hCLFlBQVksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7WUFDN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5RjtJQUNILENBQUM7SUFOZSxnREFBNEIsK0JBTTNDLENBQUE7SUFDRCwwQkFBaUMsS0FBdUI7UUFDdEQsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsTUFBTSxNQUFNLEdBQVk7Z0JBQ3RCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtnQkFDeEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzthQUMzQixDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNILENBQUM7SUFaZSxvQ0FBZ0IsbUJBWS9CLENBQUE7QUFDSCxDQUFDLEVBN0JnQixtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQTZCbkMiLCJmaWxlIjoidmlldy1pbnRlbnQvd2luZG93LWhpc3RvcnktaGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU5hdlN0YXRlLCBJSW50ZW50IH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgV2luZG93SGlzdG9yeUhlbHBlciB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTdGF0ZSgpOiBJTmF2U3RhdGUgfCBudWxsIHtcclxuICAgIGNvbnN0IGN1cnJlbnROYXZTdGF0ZTogSU5hdlN0YXRlID0gd2luZG93Lmhpc3Rvcnkuc3RhdGU7XHJcbiAgICBpZiAoY3VycmVudE5hdlN0YXRlICYmIGN1cnJlbnROYXZTdGF0ZS5hcmVhTmFtZSAmJiBjdXJyZW50TmF2U3RhdGUudmlld1R5cGUgJiYgY3VycmVudE5hdlN0YXRlLmluc3RhbmNlSWQpIHtcclxuICAgICAgcmV0dXJuIGN1cnJlbnROYXZTdGF0ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFN0YXRlVmlld0FkZHJlc3Nlcyh2aWV3QWRkcmVzczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGdldEN1cnJlbnRTdGF0ZSgpO1xyXG4gICAgaWYgKGN1cnJlbnRTdGF0ZSkge1xyXG4gICAgICBjdXJyZW50U3RhdGUudmlzaWJsZVZpZXdTdGF0ZXMgPSB2aWV3QWRkcmVzcztcclxuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKGN1cnJlbnRTdGF0ZSwgY3VycmVudFN0YXRlLnRpdGxlIHx8IHVuZGVmaW5lZCwgY3VycmVudFN0YXRlLnVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBOYXZTdGF0ZVRvSW50ZW50KHN0YXRlOiBJTmF2U3RhdGUgfCBudWxsKTogSUludGVudCB8IG51bGwge1xyXG4gICAgaWYgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbnRlbnQ6IElJbnRlbnQgPSB7XHJcbiAgICAgICAgYXJlYU5hbWU6IHN0YXRlLmFyZWFOYW1lLFxyXG4gICAgICAgIGluc3RhbmNlSWQ6IHN0YXRlLmluc3RhbmNlSWQsXHJcbiAgICAgICAgdmlld1R5cGU6IHN0YXRlLnZpZXdUeXBlLFxyXG4gICAgICAgIHZpZXdTdGF0ZTogc3RhdGUudmlld1N0YXRlLFxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gaW50ZW50O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
