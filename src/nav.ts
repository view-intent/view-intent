import { AjaxWorker } from "ajax-worker";
import * as lodash from "lodash";
import { process, time } from "uniqid";
import { Is, Url } from "utility-collection";
import { IIntent, INavState, IUrlDataIntent } from "./types";
import { ViewIntentState } from "./view-intent-state";
import { Helper } from "./helper";
import { setTimeout } from "timers";

export namespace Nav {
	const self = Nav;
	let navWaiting: boolean = false;
	let lastIntent: IIntent = null;
	export function navWait(intent: IIntent): boolean {
		if (lastIntent !== null) {
			if (intent.viewType !== lastIntent.viewType || intent.areaName !== lastIntent.areaName) {
				lastIntent = intent;
				return false;
			} else {
				if (navWaiting === false) {
					navWaiting = true;
					setTimeout(() => {
						navWaiting = false;
					}, 150);
					lastIntent = intent;
					return false;
				} else {
					return true;
				}
			}
		} else {
			lastIntent = intent;
			return false;
		}
	}
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
		if (navWait(intent)) { return; }
		if (intent === undefined || intent === null) {
			return;
		}
		if (intent.viewType === "" || intent.viewType === undefined || intent.viewType === null ||
		intent.areaName === "" || intent.areaName === undefined || intent.areaName === null) {
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
		let shouldNavigate: boolean = true;
		const currentNavState: INavState = window.history.state;
		if (!shouldReplace) {
			if (intent.instanceId === "last" && currentNavState.viewType === intent.viewType) {
				shouldReplace = true;
			}
			if (navState.url === null || navState.url === undefined || navState.url === "") {
				shouldNavigate = false;
			}
			if (currentNavState.url === navState.url && currentNavState.viewType === intent.viewType) {
				shouldReplace = true;
			}
			if (navState.url === window.location.href) {
				shouldReplace = true;
			}
		}
		// push or replace ---------------------------
		if (shouldNavigate) {
			if (shouldReplace) {
				history.replaceState(navState, navState.title, navState.url);
			} else {
				window.history.pushState(navState, navState.title, navState.url);
			}
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
