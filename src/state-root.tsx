import { IStateRoot } from "./types";
import { Persistent } from "./persistent";

export namespace StateRoot {
	export const stateRootStore: { [stateName: string]: any } = {};
	export function registerStateRoot<T>(stateRootName: string, stateRootInstance: T): T {
		stateRootStore[stateRootName.toLowerCase()] = stateRootInstance as T;
		if ("persistInput" in stateRootInstance && "persistOutput" in stateRootInstance) {
			// console.log("persist", stateRootName);
			Persistent.init(stateRootName, stateRootStore[stateRootName.toLowerCase()]);
		}
		return stateRootStore[stateRootName.toLowerCase()] as T;
	}
	export function getStateRoot<T>(stateRootName: string) {
		return stateRootStore[stateRootName.toLowerCase()] as T;
	}
	export function getStateRootAction(stateRootName: string, actionName: string) {
		const name = stateRootName.toLowerCase();
		if ( stateRootStore[name] !== undefined) {
			if ( stateRootStore[name][actionName] !== undefined) {
				return stateRootStore[name][actionName];
			} else {
				console.warn(`The stateRoot "${name}" doesn't have an @action "${actionName}".`);
			}
		} else {
			console.warn(`The stateRoot "${name}" wasn't registered.`);
		}
		return null;
	}
	export function applyStateRoot(stateRoot: IStateRoot) {
		const stateName = stateRoot.stateName!.toLowerCase();
		const actionName = stateRoot.actionName;
		const stateRootAction = getStateRootAction(stateName, actionName!);
		if ( stateRootAction !== null) {
			stateRootAction.apply(this.getStateRoot(stateName), stateRoot.args);
		}
	}
	export function applyStatesRoots(statesRoots: IStateRoot[]) {
		if (statesRoots !== undefined && statesRoots !== null) {
			statesRoots.forEach((stateRoot) => {
				this.applyStateRoot(stateRoot);
			});
		}
	}
}
export default StateRoot;
