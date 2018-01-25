import * as mobx from "mobx";
import { IIntent, IViewInfo } from "./types";
import { View } from "./view";
import { ViewIntentState, ViewState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
import { Nav } from "./nav";
import { Helper } from "./helper";
import { ViewNotFound } from "./view-error";
import { StateRoot } from "./state-root";
import { ViewRoot } from "./view-root";
import { DataFetch } from "./data-fetch";
//
export { View } from "./view";
export { ViewFrame } from "./view-frame";

mobx.extras.isolateGlobalState();

export namespace ViewIntent {
	export const Fetch = DataFetch;
	// intent with string must be: areaName.ClassName:{id|"new"|"last"}
	export function intentView(intent: IIntent, viewState: any): void;
	export function intentView(intentUrl: string, viewState: any): void;
	export function intentView(intent: IIntent | string, viewState: any = null): void {
		const newIntent: IIntent = Helper.pathToIntent(intent, viewState);
		if (newIntent != null) {
			Nav.intentView(newIntent, null);
		}
	}
	export function registerViewType(viewInfo: IViewInfo) {
		ViewTypeStore.registerViewType(viewInfo);
	}
	export function init(element: string | HTMLElement): void;
	export function init(element: string | HTMLElement, intent: IIntent = null): void {
		ViewRoot.htmlInit(intent, element);
		Nav.start(intent);
		DataFetch.get(window.location.href);
	}
	export function registerStateRoot(stateName: string, stateRootInstance: any) {
		StateRoot.registerStateRoot(stateName, stateRootInstance);
	}
}
ViewIntent.registerViewType(ViewNotFound.viewInfo);
export default ViewIntent;
