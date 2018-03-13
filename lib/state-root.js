import { Persistent } from "./persistent";
export var StateRoot;
(function (StateRoot) {
    StateRoot.stateRootStore = {};
    function registerStateRoot(stateRootName, stateRootInstance) {
        StateRoot.stateRootStore[stateRootName.toLowerCase()] = stateRootInstance;
        if ("persistInput" in stateRootInstance && "persistOutput" in stateRootInstance) {
            // console.log("persist", stateRootName);
            Persistent.init(stateRootName, StateRoot.stateRootStore[stateRootName.toLowerCase()]);
        }
        return StateRoot.stateRootStore[stateRootName.toLowerCase()];
    }
    StateRoot.registerStateRoot = registerStateRoot;
    function getStateRoot(stateRootName) {
        return StateRoot.stateRootStore[stateRootName.toLowerCase()];
    }
    StateRoot.getStateRoot = getStateRoot;
    function getStateRootAction(stateRootName, actionName) {
        const name = stateRootName.toLowerCase();
        if (StateRoot.stateRootStore[name] !== undefined) {
            if (StateRoot.stateRootStore[name][actionName] !== undefined) {
                return StateRoot.stateRootStore[name][actionName];
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
    StateRoot.getStateRootAction = getStateRootAction;
    function applyStateRoot(stateRoot) {
        const stateName = stateRoot.stateName.toLowerCase();
        const actionName = stateRoot.actionName;
        const stateRootAction = getStateRootAction(stateName, actionName);
        if (stateRootAction !== null) {
            stateRootAction.apply(this.getStateRoot(stateName), stateRoot.args);
        }
    }
    StateRoot.applyStateRoot = applyStateRoot;
    function applyStatesRoots(statesRoots) {
        if (statesRoots !== undefined && statesRoots !== null) {
            statesRoots.forEach((stateRoot) => {
                this.applyStateRoot(stateRoot);
            });
        }
    }
    StateRoot.applyStatesRoots = applyStatesRoots;
})(StateRoot || (StateRoot = {}));
export default StateRoot;
//# sourceMappingURL=state-root.js.map