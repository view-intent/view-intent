"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateRoot;
(function (StateRoot) {
    var stateRootStore = {};
    function registerStateRoot(stateName, stateRootInstance) {
        stateRootStore[stateName] = stateRootInstance;
    }
    StateRoot.registerStateRoot = registerStateRoot;
    function applyStateRoot(stateRoot) {
        stateRootStore[stateRoot.stateName][stateRoot.actionName].apply(this, stateRoot.args);
    }
    StateRoot.applyStateRoot = applyStateRoot;
    function applyStatesRoots(statesRoots) {
        var _this = this;
        statesRoots.forEach(function (stateRoot) {
            _this.applyStateRoot(stateRoot);
        });
    }
    StateRoot.applyStatesRoots = applyStatesRoots;
})(StateRoot = exports.StateRoot || (exports.StateRoot = {}));
exports.default = StateRoot;
//# sourceMappingURL=state-root.js.map