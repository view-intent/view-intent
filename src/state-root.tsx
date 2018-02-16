import { IStateRoot } from "./types";

export namespace StateRoot {
	// const stateRootStore: { [stateName: string]: { [actionName: string]: (...args: any[]) => any; } } = {};
	export const stateRootStore: { [stateName: string]: any } = {};
	export function registerStateRoot<T>(stateRootName: string, stateRootInstance: T): T {
		// console.log(`vc está registrando ${stateRootName.toLowerCase()}`);
		stateRootStore[stateRootName.toLowerCase()] = stateRootInstance as T;
		return stateRootStore[stateRootName.toLowerCase()] as T;
	}
	export function getStateRoot<T>(stateRoot: string) {
		return stateRootStore[stateRoot.toLowerCase()] as T;
	}
	export function getStateRootAction(stateRootName: string, actionName: string) {
		const name = stateRootName.toLowerCase();
		if ( stateRootStore[name] !== undefined) {
			if ( stateRootStore[name][actionName] !== undefined) {
				return stateRootStore[name][actionName];
			} else {
				console.warn(`The stateRoot "${name}" doesn't have an @action "${actionName}".`);
				// throw new Error(`The stateRoot "${stateRoot}" doesn't have an @action "${actionName}".`);
			}
		} else {
			console.warn(`The stateRoot "${name}" wasn't registered.`);
			// throw new Error(`The stateRoot "${stateRoot}" wasn't registered.`);
		}
		return null;
	}
	export function applyStateRoot(stateRoot: IStateRoot) {
		const stateName = stateRoot.stateName.toLowerCase();
		const actionName = stateRoot.actionName;
		// ---------------
		const stateRootAction = getStateRootAction(stateName, actionName);
		if ( stateRootAction !== null) {
			// stateRootAction.apply(stateRootAction, stateRoot.args);
			// stateRootAction.bind(this.getStateRoot(stateName)).apply(this.getStateRoot(stateName), stateRoot.args);
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
