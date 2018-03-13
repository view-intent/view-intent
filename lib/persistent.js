import { observe } from "mobx";
import * as localforage from "localforage";
import { Is } from "utility-collection";
// import * as CircularJSON from "circular-json";
export var Persistent;
(function (Persistent) {
    function restoreState(stateRootName, stateRootInstance) {
        setImmediate(() => {
            localforage.getItem("@viewintent:" + stateRootName).then((value) => {
                if (!Is.nullOrUndefined(value)) {
                    stateRootInstance.persistInput(value);
                }
            }).catch((err) => {
                console.warn(err);
            });
        });
    }
    function saveState(stateRootName, value) {
        localforage.setItem("@viewintent:" + stateRootName, value);
    }
    function init(stateRootName, stateRootInstance) {
        if (stateRootInstance.persistOutput !== undefined && stateRootInstance.persistInput !== undefined) {
            observe(stateRootInstance, (change) => {
                saveState(stateRootName, stateRootInstance.persistOutput());
            });
            restoreState(stateRootName, stateRootInstance);
        }
    }
    Persistent.init = init;
})(Persistent || (Persistent = {}));
export default Persistent;
//# sourceMappingURL=persistent.js.map