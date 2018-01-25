import { IIntent, IViewInfo } from "./types";
import { DataFetch } from "./data-fetch";
export { View } from "./view";
export { ViewFrame } from "./view-frame";
export declare namespace ViewIntent {
    const Fetch: typeof DataFetch;
    function intentView(intent: IIntent, viewState: any): void;
    function intentView(intentUrl: string, viewState: any): void;
    function registerViewType(viewInfo: IViewInfo): void;
    function init(element: string | HTMLElement): void;
    function registerStateRoot(stateName: string, stateRootInstance: any): void;
}
export default ViewIntent;
