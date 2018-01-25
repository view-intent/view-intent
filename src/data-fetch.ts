import { AjaxWorker } from "ajax-worker";
import { IIntent, INavState, IViewIntentResponse } from "./types";
import { Nav } from "./nav";
import { Url } from "utility-collection";
import { StateRoot } from "./state-root";
//
export namespace DataFetch {
	const isReactNative: boolean = false;
	export function get(url: string, data: { [prop: string]: string | number | boolean } = null): void {
		const u = new Url("url");
		u.setQueries(data);
		this.genericFetch(url, "get");
	}
	export function post(url: string, data: { [prop: string]: string | number | boolean } = {}): void {
		this.genericFetch(url, "post", data);
	}
	export function put(url: string, data: { [prop: string]: string | number | boolean } = {}): void {
		this.genericFetch(url, "put", data);
	}
	export function patch(url: string, data: { [prop: string]: string | number | boolean } = {}): void {
		this.genericFetch(url, "patch", data);
	}
	export function del(url: string, data: { [prop: string]: string | number | boolean } = {}): void {
		const u = new Url("url");
		u.setQueries(data);
		this.genericFetch(url, "delete");
	}
	function genericFetch(url: string, method: string, data: string = null): void {
		console.warn("TODO: increment the loader count here.");
		AjaxWorker.fetch<IViewIntentResponse>({
			url,
			method,
			headers: [
				["request", "state"],
			],
			onSuccess: (response) => {
				Nav.intentView(response.data.intent, response.urlRedirected);
				StateRoot.applyStatesRoots(response.data.states);
			},
			onAbort: (request) => {
				console.warn("aborted request", request);
			},
			onError: (response) => {
				console.error("error request", response);
			},
			onDone: (response) => {
				console.error("done request", response);
				console.warn("TODO: decrease the loader counter here.");
			},
		});
	}
}
export default DataFetch;
