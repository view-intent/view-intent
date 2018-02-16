export var StateRoot;
(function (StateRoot) {
    // const stateRootStore: { [stateName: string]: { [actionName: string]: (...args: any[]) => any; } } = {};
    StateRoot.stateRootStore = {};
    function registerStateRoot(stateRootName, stateRootInstance) {
        // console.log(`vc está registrando ${stateRootName.toLowerCase()}`);
        StateRoot.stateRootStore[stateRootName.toLowerCase()] = stateRootInstance;
        return StateRoot.stateRootStore[stateRootName.toLowerCase()];
    }
    StateRoot.registerStateRoot = registerStateRoot;
    function getStateRoot(stateRoot) {
        return StateRoot.stateRootStore[stateRoot.toLowerCase()];
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
                // throw new Error(`The stateRoot "${stateRoot}" doesn't have an @action "${actionName}".`);
            }
        }
        else {
            console.warn(`The stateRoot "${name}" wasn't registered.`);
            // throw new Error(`The stateRoot "${stateRoot}" wasn't registered.`);
        }
        return null;
    }
    StateRoot.getStateRootAction = getStateRootAction;
    function applyStateRoot(stateRoot) {
        const stateName = stateRoot.stateName.toLowerCase();
        const actionName = stateRoot.actionName;
        // ---------------
        const stateRootAction = getStateRootAction(stateName, actionName);
        if (stateRootAction !== null) {
            // stateRootAction.apply(stateRootAction, stateRoot.args);
            // stateRootAction.bind(this.getStateRoot(stateName)).apply(this.getStateRoot(stateName), stateRoot.args);
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