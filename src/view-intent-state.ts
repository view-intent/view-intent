// import { action, observable } from "../mobx/main"; // "view-intent-mobx";
import { process } from "uniqid";
import { IIntent, INavState } from "./types";
import { View } from "./view";
import { ViewTypeStore } from "./view-type-store";
import { Helper } from "./helper";
import { Is, Url, List } from "utility-collection";
import mobx from "mobx";
import { WindowHistoryHelper } from "./window-history-helper";
import { Observable } from "abstract-observable";

export class ViewState extends Observable {
  public root: ViewIntentState;
  public areaName: string;
  public get storeName(): string {
    return this.areaName.toLowerCase() + "." + this.viewType.replace(new RegExp("-", "g"), "").toLowerCase();
  }

  public viewType: string;
  public instanceId: string;
  public frameId: string;
  public viewTypeInfo: ViewTypeStore.IViewTypeInfo;
  public require: string[] | null = null;
  // ------------
  public visible: boolean = false;
  public viewState: any | null = {};
  public store = ViewIntentState.Instance;
  // @observable public visible: boolean = false;
  // @observable public viewState: any | null = {};
  // @observable public store = ViewIntentState.Instance;
  private stateInstance = ViewIntentState.Instance;
  constructor(intent: IIntent, root: ViewIntentState) {
    super(root);
    this.root = root;
    this.viewType = intent.viewType;
    this.areaName = intent.areaName;
    if (Is.empty(intent.instanceId) || intent.instanceId === "new" || intent.instanceId === "last") {
      this.instanceId = process();
    } else {
      this.instanceId = intent.instanceId!.toString();
    }
    this.viewState = intent.viewState;
    this.viewTypeInfo = ViewTypeStore.getViewTypeInfo(this.areaName, this.viewType);
    if (this.viewTypeInfo === undefined) {
      throw new Error(`The View "${this.areaName}.${this.viewType}"  wasn't registered.`);
    } else {
      this.frameId = this.viewTypeInfo.frameId;
    }
  }
  // @action public show(processRequires: boolean) {
  public show(processRequires: boolean) {
    if (!this.visible) {
      this.visible = true;
      if (this.require === null) {
        this.require = this.viewTypeInfo.require;
      }
      processRequires && this.require && this.require.forEach((requireItem) => {
        if (requireItem !== "global.stack") {
          const requireViewState = this.stateInstance.getViewStateByIntent(requireItem);
          requireViewState && requireViewState.show(true);
        }
      });
      this.root.notify();
    }
    this.notify();
  }
  // @action public hide() {
  public hide() {
    if (this.visible) {
      this.visible = false;
      this.root.notify();
    }
    this.notify();
  }
  public getViewInstanceAddress(): string {
    return (`${this.areaName}.${this.viewType}:${this.instanceId}`).toLowerCase();
  }
  public setState(state: any | null = {}): void {
    this.viewState = state;
    this.notify();
  }
}
export class ViewIntentState extends Observable {
  private static _instance: ViewIntentState;
  public static get Instance(): ViewIntentState {
    return this._instance || (this._instance = new this());
  }
  public viewStateList: ViewState[] = [];
  // @observable public version: number = 0;
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
    const i: number = this.viewStateList.findIndex((viewState: ViewState) => {
      return viewState.viewType.toLowerCase() === viewType && viewState.areaName.toLowerCase() === areaName;
    });
    const r = this.viewStateList[i];
    if (i >= 0 && r !== undefined) {
      return r;
    }
    return null;
  }
  public getViewStateById(intent: IIntent, generate: boolean = false): ViewState | null {
    if (intent === null) {
      return null;
    }
    let r: ViewState | undefined;
    if (!Is.empty(intent.instanceId)) {
      intent.instanceId = intent.instanceId && intent.instanceId.toLowerCase();
      intent.viewType = intent.viewType.toLowerCase();
      intent.areaName = intent.areaName.toLowerCase();
      r = this.viewStateList.find((viewState: ViewState) => {
        if (viewState.instanceId.toLowerCase() === intent.instanceId &&
          viewState.viewType.toLowerCase() === intent.viewType &&
          viewState.areaName.toLowerCase() === intent.areaName) {
          return true;
        } else {
          return false;
        }
      });
      if (r !== undefined) {
        return r as ViewState;
      }
    }
    if (generate === true) {
      r = this.newViewInstance(intent, false);
      return r;
    }
    return null;
  }
  public getViewStateByIntent(intent: IIntent | string): ViewState | null {
    if (typeof intent === "string") {
      intent = Helper.pathToIntent(intent);
    }
    let returnView: ViewState | null = null;
    if (intent.instanceId === undefined || intent.instanceId === null || intent.instanceId === "last") {
      // last
      returnView = this.getLastViewStateByType(intent.areaName, intent.viewType);
    } else if (intent.instanceId === "new") {
      // new 
      intent.instanceId = process();
      returnView = this.newViewInstance(intent, false);
    } else {
      // id
      returnView = this.getViewStateById(intent);
    }
    // new
    if (returnView === null || returnView === undefined) {
      returnView = this.newViewInstance(intent, false);
    }
    return returnView;
  }
  public getVisibleViewState(): ViewState[] {
    const r: ViewState[] = this.viewStateList.filter((viewState) => {
      return viewState.visible;
    });
    return r;
  }
  public getVisibleViewStateAddresses(): string[] {
    const r: string[] = this.getVisibleViewState().map((ViewState) => {
      return ViewState.getViewInstanceAddress();
    });
    return r;
  }
  // @action public newViewInstance(intent: IIntent, unshift: boolean = false): ViewState {
  public newViewInstance(intent: IIntent, unshift: boolean = false): ViewState {
    if (unshift) {
      this.viewStateList.unshift(new ViewState(intent, this));
      return this.viewStateList[0];
    } else {
      this.viewStateList.push(new ViewState(intent, this));
      const index: number = this.viewStateList.length - 1;
      return this.viewStateList[index];
    }
    this.notify();
  }
  public hideAll(): void {
    this.viewStateList.forEach((viewState) => {
      viewState.hide();
    });
    this.notify();
  }
  // @action public showViewStatesByAddresses(viewStateAddresses: string[]): void {
  public showViewStatesByAddresses(viewStateAddresses: string[]): void {
    this.viewStateList.forEach((viewState) => {
      const viewStateAddress: string = viewState.getViewInstanceAddress();
      if (viewStateAddresses.indexOf(viewStateAddress) > -1) {
        viewState.show(false);
      } else {
        viewState.hide();
      }
    });
    this.notify();
  }
  public processPopIntent(navState: INavState) {
    if (navState.visibleViewStates !== null) {
      this.showViewStatesByAddresses(navState.visibleViewStates);
    }
    this.notify();
  }
  public processIntent(intent: IIntent, url: string | null = null): void {
    const currentView = this.getViewStateByIntent(intent);
    if (currentView) {
      if (currentView.viewTypeInfo.require.indexOf("global.stack") === -1) {
        this.hideAll();
      }
      currentView && currentView.show(true);
    }
    WindowHistoryHelper.setCurrentStateViewAddresses(this.getVisibleViewStateAddresses());
    this.notify();
  }
  // @action public notify() {
  //   this.version++;
  // }
}
export default ViewIntentState.Instance;
