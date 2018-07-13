import { Persistent } from "./persistent";
// todo: review this module here
export var RootStore;
(function (RootStore) {
    RootStore.stateRootStore = {};
    function registerRootStore(stateRootName, stateRootInstance) {
        RootStore.stateRootStore[stateRootName.toLowerCase()] = stateRootInstance;
        if ("persistInput" in stateRootInstance && "persistOutput" in stateRootInstance) {
            Persistent.init(stateRootName, RootStore.stateRootStore[stateRootName.toLowerCase()]);
        }
        return RootStore.stateRootStore[stateRootName.toLowerCase()];
    }
    RootStore.registerRootStore = registerRootStore;
    function getRootStore(stateRootName) {
        return RootStore.stateRootStore[stateRootName.toLowerCase()];
    }
    RootStore.getRootStore = getRootStore;
    function getRootStoreAction(stateRootName, actionName) {
        var name = stateRootName.toLowerCase();
        if (RootStore.stateRootStore[name] !== undefined) {
            if (RootStore.stateRootStore[name][actionName] !== undefined) {
                return RootStore.stateRootStore[name][actionName];
            }
            else {
                console.warn("The stateRoot \"" + name + "\" doesn't have an @action \"" + actionName + "\".");
            }
        }
        else {
            console.warn("The stateRoot \"" + name + "\" wasn't registered.");
        }
        return null;
    }
    RootStore.getRootStoreAction = getRootStoreAction;
    function applyRootStore(stateRoot) {
        var stateName = stateRoot.stateName.toLowerCase();
        var actionName = stateRoot.actionName;
        var storeRootAction = getRootStoreAction(stateName, actionName);
        if (storeRootAction !== null) {
            storeRootAction.apply(this.getRootStore(stateName), stateRoot.args);
        }
    }
    RootStore.applyRootStore = applyRootStore;
    function applyStatesRoots(statesRoots) {
        var _this = this;
        if (statesRoots !== undefined && statesRoots !== null) {
            statesRoots.forEach(function (stateRoot) {
                _this.applyRootStore(stateRoot);
            });
        }
    }
    RootStore.applyStatesRoots = applyStatesRoots;
})(RootStore || (RootStore = {}));
// export default RootStore;
//# sourceMappingURL=state-root.js.map