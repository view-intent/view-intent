import { IGlobalState, IIntent, IState } from "./main-types";
import { View } from "./view";
import { ViewIntentState, ViewState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
export { View } from "./view";
export { ViewFrame } from "./view-frame";
import * as mobx from "mobx";
import { Nav } from "./nav";
import { Helper } from "./helper";
import { ViewNotFound } from "./view-error";
import { StateStoreStore } from "./state-store";

mobx.extras.isolateGlobalState();

export namespace ViewIntent {
	export const globaStateInstance: any = null;
	export function request(url: string, intent: IIntent | string = null, viewState: any = null): void {
		const newIntent = Helper.pathToIntent(intent, viewState);
		if (newIntent !== null) {
			Nav.intentViewAndRequest(url, newIntent);
		}
	}
	export function post(url: string, data: any, intent: IIntent | string = null, viewState: any = null): void {
		const newIntent = Helper.pathToIntent(intent, viewState);
		if (newIntent !== null) {
			Nav.intentViewAndPost(url, data, newIntent);
		}
	}
	// intent with string must be: areaName.ClassName:{id|"new"|"last"}
	export function intentView(intent: IIntent | string, viewState: any = null): void {
		const newIntent: IIntent = Helper.pathToIntent(intent, viewState);
		if (newIntent != null) {
			Nav.intentView(newIntent, null);
		}
	}
	export function setGlobalState(globalState: IGlobalState): void {
		if (this.globaStateInstance === null) {
			throw new Error("globaState wasn't registered.");
		} else {
			for (const stateName in globalState) {
				if (globalState.hasOwnProperty(stateName)) {
					const state: IState = globalState[stateName];
					for (const actionName in state) {
						if (state.hasOwnProperty(actionName)) {
							const actionValue = state[actionName];
							const action: (actionValue: any) => void = globaStateInstance[stateName][actionName];
							action(actionValue);
						}
					}
				}
			}
		}
	}
	export function registerViewType(areaName: string, viewType: View.IViewConstructor, frameId: string = "root", require: string[] = []) {
		ViewTypeStore.registerViewType(areaName, viewType, frameId, require);
	}
	export function init(intent: IIntent, globalStates: IGlobalState): void {
		Nav.start(intent);
	}
	// --------------------------------------------------
	// states -------------------------------------------
	export function registerStore<TStoreType>(storeName: string, store: TStoreType): void {
		StateStoreStore.registerStore(storeName, store);
	}
}

ViewIntent.registerViewType("default", ViewNotFound);

export default ViewIntent;
