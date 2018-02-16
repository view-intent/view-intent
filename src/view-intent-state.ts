import lodash from "lodash";
import { action, computed, extendShallowObservable, observable } from "mobx";
// import { observer } from "mobx-react";
import { process } from "uniqid";
import { IIntent } from "./types";
import { View } from "./view";
import { ViewTypeStore } from "./view-type-store";
// import { setImmediate } from "timers";
import { Helper } from "./helper";
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
		if (intent.instanceId === null || intent.instanceId === undefined || intent.instanceId === "new" || intent.instanceId === "last") {
			this.instanceId = process();
		} else {
			this.instanceId = intent.instanceId;
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
	public getViewStateListByFrameId(frameId: string): ViewState[] {
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
	public getLastViewStateByType(areaName: string, viewType: string): ViewState {
		if (viewType !== null && viewType !== undefined && areaName !== null && areaName !== undefined) {
			areaName = areaName.toLowerCase();
			viewType = viewType.toLowerCase();
			viewType = viewType.replace(/-/g, "");
		} else {
			throw new Error(`The arguments "AreaName" and "ViewType" must be passed.`);
		}
		return lodash.findLast(this.viewStateList, (viewState: ViewState) => {
			return viewState.viewType.toLowerCase() === viewType && viewState.areaName.toLowerCase() === areaName;
		});
	}
	public getViewStateById(intent: IIntent): ViewState {
		if (intent.instanceId !== undefined && intent.instanceId !== null) {
			intent.instanceId = intent.instanceId.toLowerCase();
		}
		intent.viewType = intent.viewType.toLowerCase();
		intent.areaName = intent.areaName.toLowerCase();
		if (intent === null || intent === undefined) {
			return this.viewStateList.find((viewState: ViewState) => {
				if (viewState.instanceId.toLowerCase() === intent.viewType &&
					viewState.viewType.toLowerCase() === intent.viewType &&
					viewState.areaName.toLowerCase() === intent.areaName ) {
						return true;
				}
			});
		}
		return null;
	}
	public isViewVisible(viewState: ViewState): boolean {
		return this.visibleViewIdList.indexOf(viewState.instanceId.toLowerCase()) > -1;
	}
	@action public processIntent(intent: IIntent): void {
		if (intent.viewType !== null && intent.viewType !== undefined) {
			intent.viewType = intent.viewType.toLowerCase();
			intent.viewType = intent.viewType.replace(/-/g, "");
		}
		if (intent.instanceId === null || intent.instanceId === undefined) {
			intent.instanceId = "last";
		}
		const newVisible: string[] = [];
		const processor = (loopIntent: IIntent): void => {
			let currentView: ViewState = null;
			// if (loopIntent.instanceType === InstanceTypeProtocol.lastInstance) {
			if (loopIntent.instanceId === "last") {
				// last instance
				currentView = this.getLastViewStateByType(loopIntent.areaName, loopIntent.viewType);
				// console.log("last by type", currentView);
			} else
			if (loopIntent.instanceId.toLowerCase() !== "last" && loopIntent.instanceId.toLowerCase() !== "new" && loopIntent.instanceId !== null && loopIntent.instanceId !== undefined) {
				// instance id
				currentView = this.getViewStateById(loopIntent);
			}
			// new instance
			if (loopIntent.instanceId === "new" || currentView === null || currentView === undefined) {
				currentView = this.newViewInstance(loopIntent);
			}
			// setState
			if (loopIntent.viewState !== null && loopIntent.viewState !== undefined) {
				currentView.viewState = loopIntent.viewState;
			}
			// return if don't exist
			if (currentView.ViewTypeInfo !== undefined || currentView.ViewTypeInfo !== null) {
				// requires ----------------
				// console.error(currentView.viewType);
				// console.error(currentView.ViewTypeInfo);
				// setImmediate(() => {
				// 	console.error(currentView.ViewTypeInfo);
				// });
				currentView.ViewTypeInfo.require.forEach((viewTypePath) => {
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
							processor(newIntent);
						}
					} else {
						throw new Error("Require views with using the path with the 'areaName'. Ex.: (areaName.ViewClassName);");
					}
				});
			}
			newVisible.push(currentView.instanceId);
		};
		processor(intent);
		this.visibleViewIdList = newVisible;
	}
	@action public newViewInstance(intent: IIntent): ViewState {
		this.viewStateList.push(new ViewState(intent));
		const index: number = this.viewStateList.length - 1;
		return this.viewStateList[index];
	}
}
export default ViewIntentState.Instance;
