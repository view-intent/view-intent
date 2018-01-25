export interface IViewIntentResponse {
    intent?: IIntent;
    states?: IStateRoot[];
}
export interface IStateRoot {
    stateName?: string;
    actionName?: string;
    args?: string[];
}
export interface IUrlDataIntent {
    url: string;
    intentUrl?: string | null;
    intent?: IIntent | null;
}
export interface IIntent {
    areaName: string;
    redirect?: string | null;
    viewType: string;
    instanceId?: "new" | "last" | string | null | undefined;
    viewState?: any | null;
    title?: string | null;
}
export interface INavState {
    areaName: string;
    viewType: string;
    instanceId?: "new" | "last" | string | null | undefined;
    url?: string;
    title?: string;
    viewState?: any | null;
}
export interface IViewInfo {
    area: string;
    name: string;
    type: any;
    frameId?: string | "root";
    require?: string[] | undefined;
}
