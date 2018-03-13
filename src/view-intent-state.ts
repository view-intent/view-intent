import lodash from "lodash";
import { action, computed, extendShallowObservable, observable, toJS } from "mobx";
// import { observer } from "mobx-react";
import { process } from "uniqid";
import { IIntent } from "./types";
import { View } from "./view";
import { ViewTypeStore } from "./view-type-store";
// import { setImmediate } from "timers";
import { Helper } from "./helper";
import { Is, Url } from "utility-collection";
// declare module lodash;
// const lodash: any = require("lodash");

export class ViewState {
	public areaName: string;
	public get storeName(): string {
		return this.areaName.toLowerCase() + "." + this.viewType.replace(new RegExp("-", "g"), "").toLowerCase();
	}
	public viewType: string;
	public instanceId: string;
	public frameId: string;
	public ViewTypeInfo: ViewTypeStore.IViewTypeInfo;
	@observable public viewState: any | null = {};
	@computed public get isVisible(): boolean {
		return ViewIntentState.Instance.isViewVisible(this);
	}
	constructor(intent: IIntent) {
		this.viewType = intent.viewType;
		this.areaName = intent.areaName;
		if (Is.empty(intent.instanceId ) || intent.instanceId === "new" || intent.instanceId === "last") {
			this.instanceId = process();
		} else {
			this.instanceId = intent.instanceId!.toString();
		}
		this.viewState = intent.viewState;
		this.ViewTypeInfo = ViewTypeStore.getViewTypeInfo(this.areaName, this.viewType);
		if (this.ViewTypeInfo === undefined) {
			throw new Error(`The View "${this.areaName}.${this.viewType}"  wasn't registered.`);
		} else {
			this.frameId = this.ViewTypeInfo.frameId;
		}
	}
	@action public setState(state: any | null = {}): void {
		this.viewState = state;
	}
}

export class ViewIntentState {
	private static _instance: ViewIntentState;
	public static get Instance(): ViewIntentState {
		return this._instance || (this._instance = new this());
	}
	@observable public viewStateList: ViewState[] = [];
	@observable public visibleViewIdList: string[] = [];
	private lastProcessed: string = "";
	public getViewStateListByFrameId(frameId: string | null): ViewState[] {
		if (frameId !== null && frameId !== undefined) {
			return this.viewStateList.filter((viewState: ViewState, index: number) => {
				if (viewState.frameId !== null && viewState.frameId !== undefined) {
					return viewState.frameId.toLowerCase() === frameId.toLowerCase();
				} else {
					return false;
				}
			});
		} else {
			return [];
		}
	}
	public getLastViewStateByType(areaName: string, viewType: string): ViewState | null {
		if (viewType !== null && viewType !== undefined && areaName !== null && areaName !== undefined) {
			areaName = areaName.toLowerCase();
			viewType = viewType.toLowerCase();
			viewType = viewType.replace(/-/g, "");
		} else {
			throw new Error(`The arguments "AreaName" and "ViewType" must be passed.`);
		}
		const r = lodash.findLast(this.viewStateList, (viewState: ViewState) => {
			return viewState.viewType.toLowerCase() === viewType && viewState.areaName.toLowerCase() === areaName;
		});
		if (r !== undefined) {
			return r;
		}
		return null;
	}
	public getViewStateById(intent: IIntent): ViewState | null {
		if (!Is.empty(intent.instanceId)) {
			intent.instanceId = intent.instanceId!.toLowerCase();
			intent.viewType = intent.viewType.toLowerCase();
			intent.areaName = intent.areaName.toLowerCase();
			const r: ViewState | undefined = this.viewStateList.find((viewState: ViewState) => {
				if (viewState.instanceId.toLowerCase() === intent.instanceId &&
					viewState.viewType.toLowerCase() === intent.viewType &&
					viewState.areaName.toLowerCase() === intent.areaName ) {
						return true;
				} else {
					return false;
				}
			});
			if (r !== undefined) {
				return r as ViewState;
			}
		}
		return null;
	}
	public isViewVisible(viewState: ViewState): boolean {
		return this.visibleViewIdList.indexOf(viewState.instanceId.toLowerCase()) > -1;
	}
	@action public processIntent(intent: IIntent, url: string | null = null): void {
		if (!Is.nullOrUndefined(intent.viewType)) {
			intent.viewType = intent.viewType.toLowerCase();
			intent.viewType = intent.viewType.replace(/-/g, "");
		}
		if (!Is.nullOrUndefined(intent.areaName)) {
			intent.areaName = intent.areaName.toLowerCase();
		}
		if (Is.nullOrUndefined(intent.instanceId)) {
			intent.instanceId = "last";
		}
		// console.log(window.location.origin, url.replace(window.location.origin, ""), url);
		const lastProcessedCheck = intent.viewType + intent.areaName + intent.instanceId + url!.replace(window.location.origin, "");
		if (this.lastProcessed !== lastProcessedCheck) {
			this.lastProcessed = lastProcessedCheck;
		}
		// else {
		// 	return; // i think this should alwais process
		// }
		const newVisible: string[] = [];
		const processor = (loopIntent: IIntent, unshift: boolean): void => {
			let currentView: ViewState | null = null;
			// if (loopIntent.instanceType === InstanceTypeProtocol.lastInstance) {
			if (Is.empty(loopIntent.instanceId )) {
				loopIntent.instanceId = "last";
			}
			if (loopIntent.instanceId!.toString() === "last") {
				// last instance
				currentView = this.getLastViewStateByType(loopIntent.areaName, loopIntent.viewType);
				// console.log("last by type", currentView);
			} else
			if (loopIntent.instanceId!.toLowerCase() !== "new") {
				// instance id
				currentView = this.getViewStateById(loopIntent);
				// console.log("get by id", currentView);
			}
			// new instance
			if (loopIntent.instanceId === "new" || Is.nullOrUndefined(currentView)) {
				currentView = this.newViewInstance(loopIntent, unshift);
			}
			// setState
			if (loopIntent.viewState !== null && loopIntent.viewState !== undefined) {
				currentView!.viewState = loopIntent.viewState;
			}
			// return if don't exist
			if (currentView!.ViewTypeInfo !== undefined || currentView!.ViewTypeInfo !== null) {
				// requires ----------------
				// console.error(currentView.viewType);
				// console.error(currentView.ViewTypeInfo);
				// setImmediate(() => {
				// 	console.error(currentView.ViewTypeInfo);
				// });
				currentView!.ViewTypeInfo.require.forEach((viewTypePath) => {
					if (viewTypePath.indexOf(".") > -1) {
						const areaName: string = viewTypePath.split(".")[0];
						const viewType: string = viewTypePath.split(".")[1];
						const viewTypeConstructor = ViewTypeStore.getViewType(areaName, viewType);
						if (viewTypeConstructor !== undefined && viewTypeConstructor !== null) {
							const newIntent: IIntent = {
								instanceId: "last",
								areaName,
								viewType,
								viewState: null,
							};
							processor(newIntent, true);
						}
					} else {
						throw new Error("Require views with using the path with the 'areaName'. Ex.: (areaName.ViewClassName);");
					}
				});
				newVisible.push(currentView!.instanceId);
				// newVisible.unshift(currentView.instanceId);
			}
		};
		processor(intent, false);
		this.visibleViewIdList = newVisible;
	}
	@action public newViewInstance(intent: IIntent, unshift: boolean = false): ViewState {
		if ( unshift ) {
			this.viewStateList.unshift(new ViewState(intent));
			return this.viewStateList[0];
		} else {
			this.viewStateList.push(new ViewState(intent));
			const index: number = this.viewStateList.length - 1;
			return this.viewStateList[index];
		}
	}
}
export default ViewIntentState.Instance;
