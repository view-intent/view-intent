import { IIntent, IViewInfo, IConfig } from "./types";
import { DataFetch } from "./data-fetch";
export { View } from "./view";
export { ViewFrame } from "./view-frame";
export * from "./data-fetch";
export * from "./types";
export declare namespace ViewIntent {
    function config(config: IConfig): void;
    const get: typeof DataFetch.get;
    const post: typeof DataFetch.post;
    const put: typeof DataFetch.put;
    const patch: typeof DataFetch.patch;
    const del: typeof DataFetch.del;
    function intentView(intent: IIntent): void;
    function intentView(url: string): void;
    function intentView(intent: IIntent, viewState: any): void;
    function intentView(url: string, viewState: any): void;
    function registerViewType(viewInfo: IViewInfo): void;
    function init(element: string | HTMLElement): void;
    function registerRootStore<T>(stateName: string, stateRootInstance: T): T;
    function getRootStore<T>(stateName: string, stateRootClass?: any): T | undefined;
}
export default ViewIntent;
