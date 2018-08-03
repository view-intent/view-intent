import { View } from "./view";
import { ViewTypeStore } from "./view-type-store";
import { Nav } from "./nav";
import { ViewNotFound } from "./view-error";
import { RootStore } from "./state-root";
import { ViewRoot } from "./view-root";
import { DataFetch } from "./data-fetch";
import { Url } from "utility-collection";
import { ViewIntentDom } from "./view-intent-dom";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Config } from "./config";
import { intentView as intentViewImport } from "./intent-view";
import { config as configStore } from "view-intent-store";
// export
// export {  Persistent } from "./persistent";
export { React, ReactDOM };
export { View };
export { ViewFrame } from "./view-frame";
export { Component } from "./component";
// export { IIntent, IViewInfo, IRootStore, IConfig } from "./types";
// export * from "./data-fetch";
// import { Main } from "../main";
export var ViewIntent;
(function (ViewIntent) {
    function config(config) {
        // console.log("--", Vis);
        // Vis.config({
        //   fetchAction: (url: string) => {
        //     this.get(url);
        //   },
        //   registrationAction: this.registerRootStore,
        // });
        Config.set(config);
        if (config.element !== undefined) {
            init(config.element);
        }
        if (config.notFound === undefined) {
            ViewIntent.registerViewType(ViewNotFound.viewInfo);
        }
        else {
            ViewNotFound.viewInfo.type = config.notFound.type;
            // ViewNotFound.viewInfo.area = config.notFound.area;
            ViewNotFound.viewInfo.frameId = config.notFound.frameId;
            ViewNotFound.viewInfo.require = config.notFound.require;
            ViewIntent.registerViewType(ViewNotFound.viewInfo);
        }
    }
    ViewIntent.config = config;
    ViewIntent.get = DataFetch.get;
    ViewIntent.post = DataFetch.post;
    ViewIntent.put = DataFetch.put;
    ViewIntent.patch = DataFetch.patch;
    ViewIntent.del = DataFetch.del;
    // areaName.ClassName:{id|"new"|"last"}
    // #region intentView
    ViewIntent.intentView = intentViewImport;
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
    function back() {
        window.history.back();
    }
    ViewIntent.back = back;
    // #region
    function registerViewType(viewInfo) {
        if (viewInfo.area === undefined || viewInfo.area === null) {
            viewInfo.area = "global";
        }
        if (viewInfo.require === undefined || viewInfo.require === null) {
            viewInfo.require = [];
        }
        if (typeof viewInfo.require === "string") {
            viewInfo.require = [viewInfo.require];
        }
        for (var i = 0; i < viewInfo.require.length; i++) {
            if (viewInfo.require[i].indexOf("#") === 0) {
                viewInfo.require[i] = viewInfo.require[i].replace("#", "");
            }
            if (viewInfo.require[i].indexOf(".") < 0) {
                viewInfo.require[i] = "global." + viewInfo.require[i];
            }
        }
        ViewTypeStore.registerViewType(viewInfo);
    }
    ViewIntent.registerViewType = registerViewType;
    var justLoaded = true;
    var timeOut;
    function refreshCurrentDataStores() {
        if (timeOut !== undefined) {
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(function () {
            var url = new Url(window.location.href);
            url.setQuery("popping", "true");
            DataFetch.get(url.toString());
        }, 200);
    }
    function init(element, intent, hotLoader) {
        if (intent === void 0) { intent = null; }
        if (hotLoader === void 0) { hotLoader = true; }
        ViewRoot.htmlInit(intent, element, hotLoader);
        Nav.start(intent);
        DataFetch.get(window.location.href);
        ViewIntentDom.init();
        window.addEventListener("popstate", function (e) {
            Nav.intentViewPop(e.state);
            refreshCurrentDataStores(); // ! testing this aproach, don't appear to work
            // DataFetch.get(window.location.href);
            // DataFetch.get(window.location.href); // ! best without, come back later
        });
    }
    function registerRootStore(stateName, stateRootInstance) {
        return RootStore.registerRootStore(stateName, stateRootInstance);
    }
    ViewIntent.registerRootStore = registerRootStore;
    function getRootStore(stateName, stateRootClass) {
        if (RootStore.getRootStore(stateName) !== undefined && RootStore.getRootStore(stateName) !== null) {
            return RootStore.getRootStore(stateName);
        }
        else {
            if (stateRootClass !== undefined) {
                return RootStore.registerRootStore(stateName, new stateRootClass());
            }
        }
    }
    ViewIntent.getRootStore = getRootStore;
})(ViewIntent || (ViewIntent = {}));
configStore({
    fetchAction: function (url) { ViewIntent.get(url); },
    registrationAction: ViewIntent.registerRootStore,
});
export default ViewIntent;
//# sourceMappingURL=main.js.map