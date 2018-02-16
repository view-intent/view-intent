import { AjaxWorker } from "ajax-worker";
import { IIntent, INavState, IViewIntentResponse } from "./types";
import { Nav } from "./nav";
import { Url, Is } from "utility-collection";
import { StateRoot } from "./state-root";
import { Helper } from "./helper";
//
export namespace DataFetch {
	const isReactNative: boolean = false;
	// function intentViewFromUrl(url: string): void {
	// 	const urlDataIntent = Helper.toUrlDataIntent(url);
	// 	if (urlDataIntent.intent !== null) {
	// 		Nav.intentView(urlDataIntent.intent, urlDataIntent.url);
	// 	}
	// }
	export function get(url: string, data: { [prop: string]: string | number | boolean } = null): void {
		const u = new Url(url);
		u.setQueries(data);
		genericFetch(url, "get");
	}
	export function post(url: string, data: { [prop: string]: string | number | boolean } = {}): void {
		genericFetch(url, "post", data);
	}
	export function put(url: string, data: { [prop: string]: string | number | boolean } = {}): void {
		genericFetch(url, "put", data);
	}
	export function patch(url: string, data: { [prop: string]: string | number | boolean } = {}): void {
		genericFetch(url, "patch", data);
	}
	export function del(url: string, data: { [prop: string]: string | number | boolean } = {}): void {
		const u = new Url("url");
		u.setQueries(data);
		genericFetch(url, "delete");
	}
	function genericFetch(url: string, method: string, data: { [prop: string]: string | number | boolean } = {}): void {
		let viewIntentedPushed: boolean = false;
		const urlDataIntent = Helper.toUrlDataIntent(url);
		if (!Is.nullOrUndefined(urlDataIntent.intent)) {
			if (!Is.nullOrUndefined(urlDataIntent.intent.viewType) && !Is.nullOrUndefined(urlDataIntent.intent.areaName)) {
				viewIntentedPushed = true;
				Nav.intentView(urlDataIntent.intent, urlDataIntent.url);
			}
		}
		if (urlDataIntent.url !== null && urlDataIntent.url !== undefined && urlDataIntent.url !== "") {
			// console.warn("TODO: increment the loader count here.");
			AjaxWorker.fetch<IViewIntentResponse>({
				id: method !== "get" ? undefined : "getviewintentfetch",
				url: urlDataIntent.url,
				body: method !== "get" && method !== "delete" ? data : undefined,
				method,
				headers: [
					["request", "state"],
					["Accept", "application/json"],
					["Content-Type", "application/json"],
				],
				onSuccess: (response) => {
					if (!viewIntentedPushed || response.redirected) {
						Nav.intentView(response.data.intent, response.urlRedirected);
					}
					if (!Is.nullOrUndefined(response.data.intent)) {
						if (!Is.nullOrUndefined(response.data.intent.redirect)) {
							setImmediate(() => {
								DataFetch.get(response.data.intent.redirect);
							});
						}
					}
					StateRoot.applyStatesRoots(response.data.states);
				},
				onAbort: (response) => {
					// console.error("aborted request", response);
				},
				onError: (response) => {
					// console.error("error request", response);
				},
				onDone: (response) => {
					// console.error("done request", response);
					// console.warn("TODO: decrease the loader counter here.");
				},
			});
		}
	}
}
export default DataFetch;
