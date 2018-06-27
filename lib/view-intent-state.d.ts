import { IIntent, INavState } from "./types";
import { ViewTypeStore } from "./view-type-store";
import { Observable } from "abstract-observable";
export declare class ViewState extends Observable {
    root: ViewIntentState;
    areaName: string;
    readonly storeName: string;
    viewType: string;
    instanceId: string;
    frameId: string;
    viewTypeInfo: ViewTypeStore.IViewTypeInfo;
    require: string[] | null;
    visible: boolean;
    viewState: any | null;
    store: ViewIntentState;
    private stateInstance;
    constructor(intent: IIntent, root: ViewIntentState);
    notify(): Promise<void>;
    show(processRequires: boolean): void;
    hide(): void;
    getViewInstanceAddress(): string;
    setState(state?: any | null): void;
}
export declare class ViewIntentState extends Observable {
    private static _instance;
    static readonly Instance: ViewIntentState;
    viewStateList: ViewState[];
    private lastProcessed;
    getViewStateListByFrameId(frameId: string | null): ViewState[];
    getLastViewStateByType(areaName: string, viewType: string): ViewState | null;
    getViewStateById(intent: IIntent, generate?: boolean): ViewState | null;
    getViewStateByIntent(intent: IIntent | string): ViewState | null;
    getVisibleViewState(): ViewState[];
    getVisibleViewStateAddresses(): string[];
    newViewInstance(intent: IIntent, unshift?: boolean): ViewState;
    hideAll(): void;
    showViewStatesByAddresses(viewStateAddresses: string[]): void;
    processPopIntent(navState: INavState): void;
    processIntent(intent: IIntent, url?: string | null): void;
}
declare const _default: ViewIntentState;
export default _default;
