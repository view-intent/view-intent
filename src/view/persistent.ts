import * as localforage from "localforage";
import { Is } from "utility-collection";
import { Observable } from "abstract-observable";
// export interface IPersistent<T> {
//   persistInput(data: T): Promise<void>;
//   persistOutput(): T;
// }

export namespace Persistent {
  function restoreState(stateRootName: string, persistentInstance: IPersistent<any>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setImmediate(() => {
        localforage.getItem("@viewintent:" + stateRootName).then((value) => {
          if (!Is.nullOrUndefined(value)) {
            persistentInstance.persistInput(value);
            resolve();
          }
        }).catch((err) => {
          console.warn(err);
          resolve();
        });
      });
    });
  }
  function saveState(stateRootName: string, value: any): Promise<void> {
    return localforage.setItem("@viewintent:" + stateRootName, value);
  }
  export function init(stateRootName: string, persistentInstance: IPersistent<any>) {
    if (persistentInstance.persistOutput !== undefined && persistentInstance.persistInput !== undefined) {
      if (persistentInstance instanceof Observable) {
        persistentInstance.subscribe(() => {
          saveState(stateRootName, persistentInstance.persistOutput());
        });
      }
      restoreState(stateRootName, persistentInstance);
    }
  }
}
export default Persistent;
