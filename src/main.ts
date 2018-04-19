// import * as mobx from "mobx";
import { IIntent, IViewInfo, IRootStore, IConfig } from "./types";
import { View } from "./view";
import { ViewIntentState, ViewState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
import { Nav } from "./nav";
import { Helper } from "./helper";
import { ViewNotFound } from "./view-error";
import { RootStore } from "./state-root";
import { ViewRoot } from "./view-root";
import { DataFetch } from "./data-fetch";
import { Is } from "utility-collection";
import { ViewIntentDom } from "./view-intent-dom";
//
export { View } from "./view";
export { ViewFrame } from "./view-frame";
export * from "./data-fetch";
export * from "./types";

// mobx.extras.isolateGlobalState();
export namespace ViewIntent {
  export function config(config: IConfig) {
    // DataFetch.origin = config.origin;
    init(config.element);
  }
  export const get = DataFetch.get;
  export const post = DataFetch.post;
  export const put = DataFetch.put;
  export const patch = DataFetch.patch;
  export const del = DataFetch.del;
  // areaName.ClassName:{id|"new"|"last"}
  // #region intentView
  export function intentView(intent: IIntent): void;
  export function intentView(url: string): void;
  export function intentView(intent: IIntent, viewState: any): void;
  export function intentView(url: string, viewState: any): void;
  export function intentView(intentOrUrl: IIntent | string, viewState: any = null): void {
    const intent: IIntent = Helper.pathToIntent(intentOrUrl, viewState);
    const url: string | null = Helper.removeSharp(intentOrUrl);
    if (!Is.empty(url) && !Is.nullOrUndefined(url)) {
      DataFetch.get(url!);
    }
    if (intent != null) {
      Nav.intentView(intent, url!);
    }
  }
  // #endregion
  // #region
  export function registerViewType(viewInfo: IViewInfo) {
    if (viewInfo.area === undefined || viewInfo.area === null) {
      viewInfo.area = "global";
    }
    if (viewInfo.require === undefined || viewInfo.require === null) {
      viewInfo.require = [];
    }
    for (let i = 0; i < viewInfo.require.length; i++) {
      if (viewInfo.require[i].indexOf("#") === 0) {
        viewInfo.require[i] = viewInfo.require[i].replace("#", "");
      }
      if (viewInfo.require[i].indexOf(".") < 0) {
        viewInfo.require[i] = "global." + viewInfo.require[i];
      }
    }
    ViewTypeStore.registerViewType(viewInfo);
  }
  export function init(element: string | HTMLElement): void;
  export function init(element: string | HTMLElement, intent: IIntent | null = null, hotLoader: boolean = true): void {
    ViewRoot.htmlInit(intent!, element, hotLoader);
    Nav.start(intent);
    DataFetch.get(window.location.href);
    ViewIntentDom.init();
    window.addEventListener("popstate", (e) => {
      Nav.intentViewPop(e.state);
      // DataFetch.get(window.location.href); // best without
    });
  }
  export function registerRootStore<T>(stateName: string, stateRootInstance: T): T {
    return RootStore.registerRootStore<T>(stateName, stateRootInstance);
  }
  export function getRootStore<T>(stateName: string, stateRootClass?: any): T | undefined {
    if (RootStore.getRootStore<T>(stateName) !== undefined && RootStore.getRootStore<T>(stateName) !== null) {
      return RootStore.getRootStore<T>(stateName);
    } else {
      if (stateRootClass !== undefined) {
        return RootStore.registerRootStore<T>(stateName, new stateRootClass());
      }
    }
  }
}
ViewIntent.registerViewType(ViewNotFound.viewInfo);
export default ViewIntent;
