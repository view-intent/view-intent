// import { observe, toJS } from "mobx";
import { observe, toJS } from "view-intent-mobx";
import * as localforage from "localforage";
import { Reflection } from "utility-collection";
import { Is } from "utility-collection";
// import * as CircularJSON from "circular-json";

export namespace Persistent {
  function restoreState(stateRootName: string, stateRootInstance: any) {
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
  function saveState(stateRootName: string, value: any) {
    localforage.setItem("@viewintent:" + stateRootName, value);
  }
  export function init(stateRootName: string, stateRootInstance: any) {
    if (stateRootInstance.persistOutput !== undefined && stateRootInstance.persistInput !== undefined) {
      observe(stateRootInstance, (change) => {
        if ((change as any).name !== "viUpVersion") {
          saveState(stateRootName, stateRootInstance.persistOutput());
        }
      });
      restoreState(stateRootName, stateRootInstance);
    }
  }
}
export default Persistent;
