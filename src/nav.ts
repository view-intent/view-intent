import { AjaxWorker } from "ajax-worker";
import * as lodash from "lodash";
import { process, time } from "uniqid";
import { Is, Url } from "utility-collection";
import { IIntent, INavState } from "./main-types";
import { ViewIntentState } from "./view-intent-state";

export namespace Nav {
	const self = Nav;
	export function intentViewAndRequest(url: string, intent: IIntent = null): void {
		if (intent !== null) {
			self.intentView(intent, url);
		}
		AjaxWorker.fetch<{ intent: IIntent; state: any; }>({
			url,
			headers: [
				["request", "state"],
			],
			onSuccess: (response) => {
				console.log(response.data);
				// Nav.intentView(response.data.intent, response.urlRedirected);
			},
			onAbort: (request) => {
				console.warn("aborted request", request);
			},
			onError: (response) => {
				console.error("error request", response);
			},
		});
	}
	export function intentViewAndPost(url: string, data: any, intent: IIntent = null): void {
		if (intent !== null) {
			self.intentView(intent, url);
		}
		AjaxWorker.fetch<any>({
			url,
			method: "POST",
			headers: [
				["request", "state"],
			],
			onSuccess: (response) => {
				console.log("sucess -----");
			},
			onAbort: (request) => {
				console.log("error -----");
			},
		});
	}

	export function goback() {
		window.history.back();
	}
	export function start(intent: IIntent): void {
		const url: string = window.location.href;
		window.onpopstate = (e: PopStateEvent) => {
			intentViewPop(e.state);
		};
		self.intentViewAndRequest(window.location.href, intent);
	}

	export function intentView(intent: IIntent, url: string, title: string = null): void {
		let instanceId: string = intent.instanceId;
		if (instanceId === null || instanceId === undefined) {
			instanceId = process();
		}
		let viewType: string = intent.viewType;
		if (viewType !== null && viewType !== undefined) {
			viewType = viewType.toLowerCase();
			viewType = viewType.replace(/-/g, "");
		}
		const navState: INavState = {
			areaName: intent.areaName,
			instanceId,
			viewType: intent.viewType,
			title,
			url,
			viewState: intent.viewState,
		};
		// should replace ----------------------------
		let shouldReplace: boolean = (window.history.state === undefined || window.history.state === null);
		const currentNavState: INavState = window.history.state;
		if (!shouldReplace) {
			if (intent.instanceId === "last" && currentNavState.viewType === intent.viewType) {
				shouldReplace = true;
			}
			if (navState.url === null || navState.url === undefined) {
				shouldReplace = true;
			}
			if (currentNavState.url === navState.url) {
				shouldReplace = true;
			}
			if (navState.url === window.location.href) {
				shouldReplace = true;
			}
		}
		// push or replace ---------------------------
		if (shouldReplace) {
			history.replaceState(navState, navState.title, navState.url);
		} else {
			window.history.pushState(navState, navState.title, navState.url);
		}
		ViewIntentState.Instance.processIntent(intent);
	}
	export function intentViewPop(state: INavState): void {
		if (state !== null && state !== undefined) {
			const intent: IIntent = {
				areaName: state.areaName,
				instanceId: state.instanceId,
				viewType: state.viewType,
				viewState: state.viewState,
			};
			ViewIntentState.Instance.processIntent(intent);
		}
	}
}
