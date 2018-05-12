"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const persistent_1 = require("./persistent");
var RootStore;
(function (RootStore) {
    RootStore.stateRootStore = {};
    function registerRootStore(stateRootName, stateRootInstance) {
        RootStore.stateRootStore[stateRootName.toLowerCase()] = stateRootInstance;
        if ("persistInput" in stateRootInstance && "persistOutput" in stateRootInstance) {
            persistent_1.Persistent.init(stateRootName, RootStore.stateRootStore[stateRootName.toLowerCase()]);
        }
        return RootStore.stateRootStore[stateRootName.toLowerCase()];
    }
    RootStore.registerRootStore = registerRootStore;
    function getRootStore(stateRootName) {
        return RootStore.stateRootStore[stateRootName.toLowerCase()];
    }
    RootStore.getRootStore = getRootStore;
    function getRootStoreAction(stateRootName, actionName) {
        const name = stateRootName.toLowerCase();
        if (RootStore.stateRootStore[name] !== undefined) {
            if (RootStore.stateRootStore[name][actionName] !== undefined) {
                return RootStore.stateRootStore[name][actionName];
            }
            else {
                console.warn(`The stateRoot "${name}" doesn't have an @action "${actionName}".`);
            }
        }
        else {
            console.warn(`The stateRoot "${name}" wasn't registered.`);
        }
        return null;
    }
    RootStore.getRootStoreAction = getRootStoreAction;
    function applyRootStore(stateRoot) {
        const stateName = stateRoot.stateName.toLowerCase();
        const actionName = stateRoot.actionName;
        const stateRootAction = getRootStoreAction(stateName, actionName);
        if (stateRootAction !== null) {
            stateRootAction.apply(this.getRootStore(stateName), stateRoot.args);
        }
    }
    RootStore.applyRootStore = applyRootStore;
    function applyStatesRoots(statesRoots) {
        if (statesRoots !== undefined && statesRoots !== null) {
            statesRoots.forEach((stateRoot) => {
                this.applyRootStore(stateRoot);
            });
        }
    }
    RootStore.applyStatesRoots = applyStatesRoots;
})(RootStore = exports.RootStore || (exports.RootStore = {}));
exports.default = RootStore;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC9zdGF0ZS1yb290LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZDQUEwQztBQUUxQyxJQUFpQixTQUFTLENBd0N6QjtBQXhDRCxXQUFpQixTQUFTO0lBQ1gsd0JBQWMsR0FBaUMsRUFBRSxDQUFDO0lBQy9ELDJCQUFxQyxhQUFxQixFQUFFLGlCQUFvQjtRQUM5RSxVQUFBLGNBQWMsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxpQkFBc0IsQ0FBQztRQUNyRSxJQUFJLGNBQWMsSUFBSSxpQkFBaUIsSUFBSSxlQUFlLElBQUksaUJBQWlCLEVBQUU7WUFDL0UsdUJBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQUEsY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDN0U7UUFDRCxPQUFPLFVBQUEsY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBTSxDQUFDO0lBQzFELENBQUM7SUFOZSwyQkFBaUIsb0JBTWhDLENBQUE7SUFDRCxzQkFBZ0MsYUFBcUI7UUFDbkQsT0FBTyxVQUFBLGNBQWMsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQU0sQ0FBQztJQUMxRCxDQUFDO0lBRmUsc0JBQVksZUFFM0IsQ0FBQTtJQUNELDRCQUFtQyxhQUFxQixFQUFFLFVBQWtCO1FBQzFFLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QyxJQUFJLFVBQUEsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN0QyxJQUFJLFVBQUEsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDbEQsT0FBTyxVQUFBLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLDhCQUE4QixVQUFVLElBQUksQ0FBQyxDQUFDO2FBQ2xGO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksc0JBQXNCLENBQUMsQ0FBQztTQUM1RDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVplLDRCQUFrQixxQkFZakMsQ0FBQTtJQUNELHdCQUErQixTQUFxQjtRQUNsRCxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDeEMsTUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVcsQ0FBQyxDQUFDO1FBQ25FLElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtZQUM1QixlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQVBlLHdCQUFjLGlCQU83QixDQUFBO0lBQ0QsMEJBQWlDLFdBQXlCO1FBQ3hELElBQUksV0FBVyxLQUFLLFNBQVMsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQ3JELFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQU5lLDBCQUFnQixtQkFNL0IsQ0FBQTtBQUNILENBQUMsRUF4Q2dCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBd0N6QjtBQUNELGtCQUFlLFNBQVMsQ0FBQyIsImZpbGUiOiJ2aWV3LWludGVudC9zdGF0ZS1yb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVJvb3RTdG9yZSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IFBlcnNpc3RlbnQgfSBmcm9tIFwiLi9wZXJzaXN0ZW50XCI7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFJvb3RTdG9yZSB7XHJcbiAgZXhwb3J0IGNvbnN0IHN0YXRlUm9vdFN0b3JlOiB7IFtzdGF0ZU5hbWU6IHN0cmluZ106IGFueSB9ID0ge307XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyUm9vdFN0b3JlPFQ+KHN0YXRlUm9vdE5hbWU6IHN0cmluZywgc3RhdGVSb290SW5zdGFuY2U6IFQpOiBUIHtcclxuICAgIHN0YXRlUm9vdFN0b3JlW3N0YXRlUm9vdE5hbWUudG9Mb3dlckNhc2UoKV0gPSBzdGF0ZVJvb3RJbnN0YW5jZSBhcyBUO1xyXG4gICAgaWYgKFwicGVyc2lzdElucHV0XCIgaW4gc3RhdGVSb290SW5zdGFuY2UgJiYgXCJwZXJzaXN0T3V0cHV0XCIgaW4gc3RhdGVSb290SW5zdGFuY2UpIHtcclxuICAgICAgUGVyc2lzdGVudC5pbml0KHN0YXRlUm9vdE5hbWUsIHN0YXRlUm9vdFN0b3JlW3N0YXRlUm9vdE5hbWUudG9Mb3dlckNhc2UoKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlUm9vdFN0b3JlW3N0YXRlUm9vdE5hbWUudG9Mb3dlckNhc2UoKV0gYXMgVDtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RTdG9yZTxUPihzdGF0ZVJvb3ROYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdGF0ZVJvb3RTdG9yZVtzdGF0ZVJvb3ROYW1lLnRvTG93ZXJDYXNlKCldIGFzIFQ7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRSb290U3RvcmVBY3Rpb24oc3RhdGVSb290TmFtZTogc3RyaW5nLCBhY3Rpb25OYW1lOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IG5hbWUgPSBzdGF0ZVJvb3ROYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoc3RhdGVSb290U3RvcmVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAoc3RhdGVSb290U3RvcmVbbmFtZV1bYWN0aW9uTmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZVJvb3RTdG9yZVtuYW1lXVthY3Rpb25OYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYFRoZSBzdGF0ZVJvb3QgXCIke25hbWV9XCIgZG9lc24ndCBoYXZlIGFuIEBhY3Rpb24gXCIke2FjdGlvbk5hbWV9XCIuYCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgVGhlIHN0YXRlUm9vdCBcIiR7bmFtZX1cIiB3YXNuJ3QgcmVnaXN0ZXJlZC5gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gYXBwbHlSb290U3RvcmUoc3RhdGVSb290OiBJUm9vdFN0b3JlKSB7XHJcbiAgICBjb25zdCBzdGF0ZU5hbWUgPSBzdGF0ZVJvb3Quc3RhdGVOYW1lIS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgYWN0aW9uTmFtZSA9IHN0YXRlUm9vdC5hY3Rpb25OYW1lO1xyXG4gICAgY29uc3Qgc3RhdGVSb290QWN0aW9uID0gZ2V0Um9vdFN0b3JlQWN0aW9uKHN0YXRlTmFtZSwgYWN0aW9uTmFtZSEpO1xyXG4gICAgaWYgKHN0YXRlUm9vdEFjdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICBzdGF0ZVJvb3RBY3Rpb24uYXBwbHkodGhpcy5nZXRSb290U3RvcmUoc3RhdGVOYW1lKSwgc3RhdGVSb290LmFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gYXBwbHlTdGF0ZXNSb290cyhzdGF0ZXNSb290czogSVJvb3RTdG9yZVtdKSB7XHJcbiAgICBpZiAoc3RhdGVzUm9vdHMgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZXNSb290cyAhPT0gbnVsbCkge1xyXG4gICAgICBzdGF0ZXNSb290cy5mb3JFYWNoKChzdGF0ZVJvb3QpID0+IHtcclxuICAgICAgICB0aGlzLmFwcGx5Um9vdFN0b3JlKHN0YXRlUm9vdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBSb290U3RvcmU7XHJcbiJdfQ==
