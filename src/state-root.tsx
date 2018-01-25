import { IStateRoot } from "./types";

export namespace StateRoot {
	const stateRootStore: { [stateName: string]: { [actionName: string]: (...args: any[]) => any; } } = {};
	export function registerStateRoot(stateName: string, stateRootInstance: any) {
		stateRootStore[stateName] = stateRootInstance;
	}
	export function applyStateRoot(stateRoot: IStateRoot) {
		stateRootStore[stateRoot.stateName][stateRoot.actionName].apply(this, stateRoot.args);
	}
	export function applyStatesRoots(statesRoots: IStateRoot[]) {
		statesRoots.forEach((stateRoot) => {
			this.applyStateRoot(stateRoot);
		});
	}
}
export default StateRoot;
