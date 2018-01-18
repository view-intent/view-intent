import { IGlobalState, IIntent, IViewInfo } from "./main-types";
export { IViewInfo } from "./main-types";
export { View } from "./view";
export { ViewFrame } from "./view-frame";
export declare namespace ViewIntent {
    const globaStateInstance: any;
    function request(url: string, intent?: IIntent | string, viewState?: any): void;
    function post(url: string, data: any, intent?: IIntent | string, viewState?: any): void;
    function intentView(intent: IIntent | string, viewState?: any): void;
    function setGlobalState(globalState: IGlobalState): void;
    function registerViewType(viewInfo: IViewInfo): void;
    function init(intent: IIntent, element: string | HTMLElement): void;
    function registerStore<TStoreType>(storeName: string, store: TStoreType): void;
}
export default ViewIntent;
