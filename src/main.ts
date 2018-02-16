
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
import { Is } from "utility-collection";
import { ViewIntentDom } from "./view-intent-dom";
//
export { View } from "./view";
export { ViewFrame } from "./view-frame";
export * from "./data-fetch";
export * from "./types";

mobx.extras.isolateGlobalState();

export namespace ViewIntent {
	export const get = DataFetch.get;
	export const post = DataFetch.post;
	export const put = DataFetch.put;
	export const patch = DataFetch.patch;
	export const del = DataFetch.del;
	// areaName.ClassName:{id|"new"|"last"}
	export function intentView(intent: IIntent): void;
	export function intentView(url: string): void;
	export function intentView(intent: IIntent, viewState: any): void;
	export function intentView(url: string, viewState: any): void;
	export function intentView(intentOrUrl: IIntent | string, viewState: any = null): void {
		const intent: IIntent =  Helper.pathToIntent(intentOrUrl, viewState);
		const url: string = Helper.removeSharp(intentOrUrl);
		if ( !Is.empty(url) && !Is.nullOrUndefined(url) ) {
			DataFetch.get(url);
		}
		if (intent != null) { Nav.intentView(intent, url); }
	}
	export function registerViewType(viewInfo: IViewInfo) {
		ViewTypeStore.registerViewType(viewInfo);
	}
	export function init(element: string | HTMLElement): void;
	export function init(element: string | HTMLElement, intent: IIntent = null): void {
		ViewRoot.htmlInit(intent, element);
		Nav.start(intent);
		DataFetch.get(window.location.href);
		ViewIntentDom.init();
	}
	export function registerStateRoot<T>(stateName: string, stateRootInstance: T): T {
		return StateRoot.registerStateRoot<T>(stateName, stateRootInstance);
	}
}
ViewIntent.registerViewType(ViewNotFound.viewInfo);
export default ViewIntent;
