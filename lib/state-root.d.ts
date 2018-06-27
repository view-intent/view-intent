import { IRootStore } from "./types";
export declare namespace RootStore {
    const stateRootStore: {
        [stateName: string]: any;
    };
    function registerRootStore<T>(stateRootName: string, stateRootInstance: T): T;
    function getRootStore<T>(stateRootName: string): T;
    function getRootStoreAction(stateRootName: string, actionName: string): any;
    function applyRootStore(stateRoot: IRootStore): void;
    function applyStatesRoots(statesRoots: IRootStore[]): void;
}
