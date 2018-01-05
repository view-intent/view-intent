export interface IState {
    [actionName: string]: any;
}
export interface IGlobalState {
    [stateName: string]: IState;
}
export interface IStates {
    items: {
        [stateName: string]: IState;
    };
}
export interface IIntent {
    areaName: string;
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
