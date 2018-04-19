export interface IConfig {
    element: string | HTMLElement;
}
export interface IViewIntentResponse {
    intent?: IIntent;
    states?: IRootStore[];
}
export interface IRootStore {
    stateName?: string;
    actionName?: string;
    args?: string[];
}
export interface IUrlDataIntent {
    url: string | null;
    intentUrl?: string | null;
    intent?: IIntent | null;
}
export interface IIntent {
    areaName: string;
    instanceId?: "new" | "last" | string | null | undefined;
    redirect?: string | null;
    replaceState?: boolean;
    viewType: string;
    viewState?: any | null;
    title?: string | null;
}
export interface INavState {
    areaName: string;
    viewType: string;
    instanceId?: "new" | "last" | string | null | undefined;
    url?: string | null;
    title?: string | null;
    viewState?: any | null;
}
export interface IViewInfo {
    area?: string;
    name: string;
    type: any;
    frameId?: string | "root";
    require?: string[] | undefined;
}
