import { AjaxWorker } from "ajax-worker";
import { IIntent, INavState, IViewIntentResponse } from "./types";
import { Nav } from "./nav";
import { Url, Is } from "utility-collection";
import { RootStore } from "./state-root";
import { Helper } from "./helper";
import { IResponseOptions, IRequestOptions } from "ajax-worker/@types/interfaces";
import { process as uniq } from "uniqid";

// import {} from "ts-seriali"
//
export namespace DataFetch {
	const isReactNative: boolean = false;
	export async function get<T>(url: string, data: { [prop: string]: string | number | boolean | any } | any = null): Promise<IResponseOptions<T>> {
		const u = new Url(url);
		u.setQueries(data!);
		return await genericFetch<T>(url, "get");
	}
	export async function post<T>(url: string, data: { [prop: string]: string | number | boolean | any } | any = {}): Promise<IResponseOptions<T>> {
		return await genericFetch<T>(url, "post", data);
	}
	export async function put<T>(url: string, data: { [prop: string]: string | number | boolean | any } | any = {}): Promise<IResponseOptions<T>> {
		return await genericFetch<T>(url, "put", data);
	}
	export async function patch<T>(url: string, data: { [prop: string]: string | number | boolean | any } | any = {}): Promise<IResponseOptions<T>> {
		return await genericFetch<T>(url, "patch", data);
	}
	export async function del<T>(url: string, data: { [prop: string]: string | number | boolean | any } | any = {}): Promise<IResponseOptions<T>> {
		const u = new Url("url");
		u.setQueries(data);
		return await genericFetch<T>(url, "delete");
	}
	async function  genericFetch<T>(url: string, method: string, data: { [prop: string]: string | number | boolean | any } | any = {}): Promise<IResponseOptions<T>> {
		return new Promise<IResponseOptions<T>>((resolve, reject) => {
			let viewIntentedPushed: boolean = false;
			const urlDataIntent = Helper.toUrlDataIntent(url);
			if (!Is.nullOrUndefined(urlDataIntent.intent)) {
				if (!Is.nullOrUndefined(urlDataIntent.intent!.viewType) && !Is.nullOrUndefined(urlDataIntent.intent!.areaName)) {
					viewIntentedPushed = true;
					Nav.intentView(urlDataIntent.intent!, urlDataIntent.url!);
				}
			}
			if (urlDataIntent.url !== null && urlDataIntent.url !== undefined && urlDataIntent.url !== "") {
				AjaxWorker.fetch<T>({
					sync: true,
					id: uniq().toString(),
					url: urlDataIntent.url,
					body: method !== "get" && method !== "delete" ? data : undefined,
					method,
					headers: [
						["request", "state"],
						["Accept", "application/json"],
						["Content-Type", "application/json"],
					],
					onSuccess: (response) => {
						// if is Intent
						if ((response.data! as IViewIntentResponse).intent !== undefined && (response.data! as IViewIntentResponse).intent !== null ) {
							const data = response.data! as IViewIntentResponse;
							if ( !response.urlRedirected!.includes("p=") ) {
								if (!viewIntentedPushed || response.redirected) {
										Nav.intentView(data.intent!, response.urlRedirected!);
								}
								if (!Is.empty(data.intent!.redirect)) {
									setImmediate(async () => {
										resolve(await DataFetch.get<T>(data.intent!.redirect!));
									});
								} else {
									setImmediate(async () => {
										resolve(response);
									});
								}
								// if (!Is.empty(data.intent)) {
								// }
							}
							// contain state
							if ((response.data! as IViewIntentResponse).states !== undefined && (response.data! as IViewIntentResponse).states !== null) {
								RootStore.applyStatesRoots((response.data! as IViewIntentResponse).states!);
							}
						} else {
							resolve(response);
						}

					},
					onAbort: (response) => {
						// console.error("aborted request", response);
					},
					onError: (response) => {
						reject(response);
						// console.error("error request", response);
					},
					onDone: (response) => {
						// console.error("done request", response);
						// console.warn("TODO: decrease the loader counter here.");
					},
				});
			}
		});
	}
}
export default DataFetch;
