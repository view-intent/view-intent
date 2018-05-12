import { IIntent, IViewInfo, IRootStore } from "./types";
import { View } from "./view";
import { DataFetch } from "./data-fetch";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IConfigOptions } from "../config/config";
export { React, ReactDOM };
export { View };
export { ViewFrame } from "./view-frame";
export { IIntent, IViewInfo, IRootStore };
export declare namespace ViewIntent {
    function config(config: IConfigOptions): void;
    const get: typeof DataFetch.get;
    const post: typeof DataFetch.post;
    const put: typeof DataFetch.put;
    const patch: typeof DataFetch.patch;
    const del: typeof DataFetch.del;
    function intentView(intent: IIntent, viewState?: any, callback?: ((data: any) => void) | null): void;
    function intentView(url: string, viewState?: any, callback?: ((data: any) => void) | null): void;
    function back(): void;
    function registerViewType(viewInfo: IViewInfo): void;
    function registerRootStore<T>(stateName: string, stateRootInstance: T): T;
    function getRootStore<T>(stateName: string, stateRootClass?: any): T | undefined;
}
export default ViewIntent;
