import { AjaxWorker } from "ajax-worker";
import * as lodash from "lodash";
import { process, time } from "uniqid";
import { Is, Url } from "utility-collection";
import { IIntent, INavState, IUrlDataIntent } from "./types";
import { ViewIntentState } from "./view-intent-state";
import { Helper } from "./helper";

export namespace Nav {
	const self = Nav;
	export function goback() {
		window.history.back();
	}
	export function start(): void;
	export function start(intent: IIntent | null): void;
	export function start(intent: IIntent | null = null): void {
		let url: string;
		if (intent === undefined || intent === null) {
			const urlDataIntent: IUrlDataIntent = Helper.toUrlDataIntent(url);
			intent = urlDataIntent.intent;
			url = urlDataIntent.url;
		}
		if (intent !== null && intent !== undefined) {
			if (url === undefined || url === null) {
				url = window.location.href;
			}
			intentView(intent, url, intent.title);
		}
		window.onpopstate = (e: PopStateEvent) => {
			intentViewPop(e.state);
		};
	}
	export function intentView(intent: IIntent, url: string, title: string = null): void {
		if (intent === undefined || intent === null) {
			return;
		}
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
