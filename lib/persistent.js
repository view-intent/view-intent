import * as localforage from "localforage";
import { Is } from "utility-collection";
import { Observable } from "abstract-observable";
// export interface IPersistent<T> {
//   persistInput(data: T): Promise<void>;
//   persistOutput(): T;
// }
export var Persistent;
(function (Persistent) {
    function restoreState(stateRootName, persistentInstance) {
        return new Promise(function (resolve, reject) {
            setImmediate(function () {
                localforage.getItem("@viewintent:" + stateRootName).then(function (value) {
                    if (!Is.nullOrUndefined(value)) {
                        persistentInstance.persistInput(value);
                        resolve();
                    }
                }).catch(function (err) {
                    console.warn(err);
                    resolve();
                });
            });
        });
    }
    function saveState(stateRootName, value) {
        return localforage.setItem("@viewintent:" + stateRootName, value);
    }
    function init(stateRootName, persistentInstance) {
        if (persistentInstance.persistOutput !== undefined && persistentInstance.persistInput !== undefined) {
            if (persistentInstance instanceof Observable) {
                persistentInstance.subscribe(function () {
                    saveState(stateRootName, persistentInstance.persistOutput());
                });
            }
            restoreState(stateRootName, persistentInstance);
        }
    }
    Persistent.init = init;
})(Persistent || (Persistent = {}));
export default Persistent;
//# sourceMappingURL=persistent.js.map