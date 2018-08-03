import { IRootStore } from "./types";
import { Persistent } from "./persistent";

// todo: review this module here
export namespace RootStore {
  export const stateRootStore: { [stateName: string]: any } = {};
  export function registerRootStore<T>(stateRootName: string, stateRootInstance: T): T {
    const instance = getRootStore(stateRootName) as T;
    if (instance !== undefined && instance !== null) {
      return instance;
    } else {
      stateRootStore[stateRootName.toLowerCase()] = stateRootInstance as T;
      if ("persistInput" in stateRootInstance && "persistOutput" in stateRootInstance) {
        Persistent.init(stateRootName, stateRootStore[stateRootName.toLowerCase()]);
      }
      return stateRootStore[stateRootName.toLowerCase()] as T;
    }
  }
  export function getRootStore<T>(stateRootName: string) {
    return stateRootStore[stateRootName.toLowerCase()] as T;
  }
  export function getRootStoreAction(stateRootName: string, actionName: string) {
    const name = stateRootName.toLowerCase();
    if (stateRootStore[name] !== undefined) {
      if (stateRootStore[name][actionName] !== undefined) {
        return stateRootStore[name][actionName];
      } else {
        console.warn(`The stateRoot "${name}" doesn't have an @action "${actionName}".`);
      }
    } else {
      console.warn(`The stateRoot "${name}" wasn't registered.`);
    }
    return null;
  }
  export function applyRootStore(stateRoot: IRootStore) {
    const stateName = stateRoot.stateName!.toLowerCase();
    const actionName = stateRoot.actionName;
    const storeRootAction = getRootStoreAction(stateName, actionName!);
    if (storeRootAction !== null) {
      storeRootAction.apply(this.getRootStore(stateName), stateRoot.args);
    }
  }
  export function applyStatesRoots(statesRoots: IRootStore[]) {
    if (statesRoots !== undefined && statesRoots !== null) {
      statesRoots.forEach((stateRoot) => {
        this.applyRootStore(stateRoot);
      });
    }
  }
}
// export default RootStore;
