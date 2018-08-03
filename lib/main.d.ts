import { IIntent, IViewInfo, IRootStore } from "./types";
import { View } from "./view";
import { DataFetch } from "./data-fetch";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IConfigOptions } from "./config";
import { intentView as intentViewImport } from "./intent-view";
export { React, ReactDOM };
export { View };
export { ViewFrame } from "./view-frame";
export { IIntent, IViewInfo, IRootStore };
export { Component } from "./component";
export { IConfigOptions };
export declare namespace ViewIntent {
    function config(config: IConfigOptions): void;
    const get: typeof DataFetch.get;
    const post: typeof DataFetch.post;
    const put: typeof DataFetch.put;
    const patch: typeof DataFetch.patch;
    const del: typeof DataFetch.del;
    const intentView: typeof intentViewImport;
    function back(): void;
    function registerViewType(viewInfo: IViewInfo): void;
    function registerRootStore<T>(stateName: string, stateRootInstance: T): T;
    function getRootStore<T>(stateName: string, stateRootClass?: any): T | undefined;
}
export default ViewIntent;
