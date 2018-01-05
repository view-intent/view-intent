export declare enum InstanceTypeProtocol {
    lastInstance = 0,
    newInstance = 1,
    id = 2,
}
export interface IState {
    [actionName: string]: any;
}
export interface IStates {
    items: {
        [stateName: string]: IState;
    };
}
export interface IIntent {
    viewType: string;
    instanceId?: string | null | undefined;
    instanceType: InstanceTypeProtocol;
    viewState: any | null;
}
