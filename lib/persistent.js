"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localforage = require("localforage");
var utility_collection_1 = require("utility-collection");
var abstract_observable_1 = require("abstract-observable");
var Persistent;
(function (Persistent) {
    function restoreState(stateRootName, persistentInstance) {
        return new Promise(function (resolve, reject) {
            setImmediate(function () {
                localforage.getItem("@viewintent:" + stateRootName).then(function (value) {
                    if (!utility_collection_1.Is.nullOrUndefined(value)) {
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
            if (persistentInstance instanceof abstract_observable_1.Observable) {
                persistentInstance.subscribe(function () {
                    saveState(stateRootName, persistentInstance.persistOutput());
                });
            }
            restoreState(stateRootName, persistentInstance);
        }
    }
    Persistent.init = init;
})(Persistent = exports.Persistent || (exports.Persistent = {}));
exports.default = Persistent;
//# sourceMappingURL=persistent.js.map