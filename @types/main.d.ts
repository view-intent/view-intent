import { IGlobalState, IIntent } from "./main-types";
import { View } from "./view";
export { View } from "./view";
export { ViewFrame } from "./view-frame";
export declare namespace ViewIntent {
    const globaStateInstance: any;
    function request(url: string, intent?: IIntent | string, viewState?: any): void;
    function post(url: string, data: any, intent?: IIntent | string, viewState?: any): void;
    function intentView(intent: IIntent | string, viewState?: any): void;
    function setGlobalState(globalState: IGlobalState): void;
    function registerViewType(areaName: string, typeName: string, viewType: View.IViewConstructor, frameId?: string, require?: string[]): void;
    function init(intent: IIntent, globalStates: IGlobalState): void;
    function registerStore<TStoreType>(storeName: string, store: TStoreType): void;
}
export default ViewIntent;
