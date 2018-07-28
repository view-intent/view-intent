import { IIntent, IViewInfo, IRootStore } from "./types";
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
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Config, IConfigOptions } from "./config";
import { intentView as intentViewImport } from "./intent-view";
import * as Vis from "view-intent-store";
// export
// export {  Persistent } from "./persistent";
export { React, ReactDOM };
export { View };
export { ViewFrame } from "./view-frame";
export { IIntent, IViewInfo, IRootStore };
export { Component } from "./component";
// export { IIntent, IViewInfo, IRootStore, IConfig } from "./types";
// export * from "./data-fetch";
// import { Main } from "../main";

export namespace ViewIntent {
  export function config(config: IConfigOptions) {
    Config.set(config);
    if (config.element !== undefined) {
      init(config.element);
    }
    Vis.config({
      fetchAction: (url: string) => {
        this.get(url);
      },
      registrationAction: this.registerRootStore,
    });
  }
  export const get = DataFetch.get;
  export const post = DataFetch.post;
  export const put = DataFetch.put;
  export const patch = DataFetch.patch;
  export const del = DataFetch.del;
  // areaName.ClassName:{id|"new"|"last"}
  // #region intentView
  export const intentView = intentViewImport;
  // export function intentView(intent: IIntent, viewState?: any, callback?: ((data: any) => void) | null): void;
  // export function intentView(url: string, viewState?: any, callback?: ((data: any) => void) | null): void;
  // export function intentView(intentOrUrl: IIntent | string, viewState: any = null, callback: ((data: any) => void) | null = null): void {
  //   const intent: IIntent = Helper.pathToIntent(intentOrUrl, viewState);
  //   const url: string | null = Helper.removeSharp(intentOrUrl);
  //   if (!Is.empty(url)) {
  //     DataFetch.get(url!, undefined);
  //   }
  //   if (intent != null) {
  //     Nav.intentView(intent, url!, callback);
  //   }
  // }
  // #endregion
  export function back() {
    window.history.back();
  }
  // #region
  export function registerViewType(viewInfo: IViewInfo) {
    if (viewInfo.area === undefined || viewInfo.area === null) {
      viewInfo.area = "global";
    }
    if (viewInfo.require === undefined || viewInfo.require === null) {
      viewInfo.require = [];
    }
    if (typeof viewInfo.require === "string") {
      viewInfo.require = [viewInfo.require];
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
  function init(element: string | HTMLElement): void;
  function init(element: string | HTMLElement, intent: IIntent | null = null, hotLoader: boolean = true): void {
    ViewRoot.htmlInit(intent!, element, hotLoader);
    Nav.start(intent);
    DataFetch.get(window.location.href);
    ViewIntentDom.init();
    window.addEventListener("popstate", (e) => {
      Nav.intentViewPop(e.state);
      // DataFetch.get(window.location.href); // ! best without, but need to have because navigation broke when didn't load the view
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
// requestAnimationFrame(() => {
//   if (Config.options.element !== null && Config.options.element !== undefined) {
//     ViewIntent.config(Config.options);
//   }
// });
export default ViewIntent;
