import { IIntent, IUrlDataIntent } from "./types";

export namespace Helper {
	export function toUrlDataIntent(url: string, intentUrl: string = null): IUrlDataIntent {
		const dataIntent: IUrlDataIntent = {
			url,
			intentUrl: null,
			intent: null,
		};
		if (url.indexOf("#") > -1 ) {
			const splited = url.split("#");
			if (isViewIntentPath(splited[1])) {
				dataIntent.intentUrl = splited[1];
				dataIntent.intent = pathToIntent(dataIntent.intentUrl);
				dataIntent.url = splited[0];
			}
		}
		return dataIntent;
	}
	export function isViewIntentPath(path: string) {
		const pathArray = path.split(".");
		if (pathArray.length === 2) {
			return true;
		} else {
			return false;
		}
	}
	const dashRegExp = new RegExp("-", "g");
	export function getStoreName(areaName: string, typeName: string): string {
		areaName = areaName.replace(dashRegExp, "");
		typeName = typeName.replace(dashRegExp, "");
		return (areaName + "." + typeName).toLowerCase();
	}
	export function pathToIntent(intentUrl: string): IIntent;
	export function pathToIntent(intentUrl: string, viewState: any): IIntent;
	export function pathToIntent(intent: IIntent): IIntent;
	export function pathToIntent(intent: IIntent, viewState: any): IIntent;
	export function pathToIntent(intent: IIntent | string | null, viewState: any): IIntent;
	export function pathToIntent(intent: IIntent | string | null, viewState: any = null): IIntent {
		if (intent === null || intent === undefined) {
			return null;
		}
		let newIntent: IIntent;
		if (typeof intent === "string") {
			const pathArray = intent.split(".");
			let areaName: string;
			let viewType: string;
			let instanceId: "last" | "new" | string = "last";
			// let instanceType: InstanceTypeProtocol = InstanceTypeProtocol.lastInstance;
			// -------------------
			if (pathArray.length < 2) {
				return null;
			} else {
				const TypePathArray: string[] = pathArray[1].split(":");
				if (TypePathArray.length > 1) {
					instanceId = TypePathArray[1].toLowerCase();
				} else {
					instanceId = "last";
				}
				areaName = pathArray[0].toLowerCase();
				viewType = TypePathArray[0].toLowerCase();
			}
			// -------------------
			newIntent = {
				areaName,
				instanceId,
				viewType,
				viewState,
			};
			return newIntent;
		} else {
			newIntent = intent as IIntent;
			if (viewState !== null && viewState !== undefined) {
				newIntent.viewState = viewState;
			}
			// if (newIntent.instanceId === null || newIntent.instanceId === undefined) {
			// 	newIntent.instanceId = "last";
			// }
		}
		return newIntent;
	}
}
export default Helper;
