import { Persistent } from "./persistent";
export var RootStore;
(function (RootStore) {
    RootStore.stateRootStore = {};
    function registerRootStore(stateRootName, stateRootInstance) {
        RootStore.stateRootStore[stateRootName.toLowerCase()] = stateRootInstance;
        if ("persistInput" in stateRootInstance && "persistOutput" in stateRootInstance) {
            // console.log("persist", stateRootName);
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
})(RootStore || (RootStore = {}));
export default RootStore;
//# sourceMappingURL=state-root.js.map