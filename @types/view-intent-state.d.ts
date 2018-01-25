import { IIntent } from "./types";
import { ViewTypeStore } from "./view-type-store";
export declare class ViewState {
    areaName: string;
    readonly storeName: string;
    viewType: string;
    instanceId: string;
    frameId: string;
    ViewTypeInfo: ViewTypeStore.IViewTypeInfo;
    viewState: any | null;
    readonly isVisible: boolean;
    constructor(intent: IIntent);
    setState(state?: any | null): void;
}
export declare class ViewIntentState {
    private static _instance;
    static readonly Instance: ViewIntentState;
    viewStateList: ViewState[];
    visibleViewIdList: string[];
    getViewStateListByFrameId(frameId: string): ViewState[];
    getLastViewStateByType(areaName: string, viewType: string): ViewState;
    getViewStateById(instanceId: string): ViewState;
    isViewVisible(viewState: ViewState): boolean;
    processIntent(intent: IIntent): void;
    newViewInstance(intent: IIntent): ViewState;
}
declare const _default: ViewIntentState;
export default _default;
