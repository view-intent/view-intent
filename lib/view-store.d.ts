import { IIntent } from "./types";
export declare class ViewState {
    state: any;
    constructor(state: any);
}
export declare class ViewInstance {
    typeName: string;
    instanceId: string;
    viewState: ViewState;
    constructor(intent: IIntent);
}
export declare class FrameInstance {
    frameId: string;
    width: number;
    height: number;
    constructor(frameId: string);
}
export declare class ViewStore {
    private static _instance;
    static readonly Instance: ViewStore;
    viewList: ViewInstance[];
    intentList: IIntent[];
    getViewsByFrameId(frameId: string): ViewInstance[];
    getActiveViewsByFrameId(frameId: string): ViewInstance[];
    getViewById(viewId: string): ViewInstance;
    intent(intent: IIntent): void;
}
declare const _default: ViewStore;
export default _default;
