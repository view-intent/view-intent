import { IStateRoot } from "./types";
export declare namespace StateRoot {
    const stateRootStore: {
        [stateName: string]: any;
    };
    function registerStateRoot<T>(stateRootName: string, stateRootInstance: T): T;
    function getStateRoot<T>(stateRoot: string): T;
    function getStateRootAction(stateRootName: string, actionName: string): any;
    function applyStateRoot(stateRoot: IStateRoot): void;
    function applyStatesRoots(statesRoots: IStateRoot[]): void;
}
export default StateRoot;
