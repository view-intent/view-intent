// export enum InstanceTypeProtocol {
// 	lastInstance = 0,
// 	newInstance = 1,
// 	id = 2,
// }
export interface IState {
	[actionName: string]: any;
}
export interface IGlobalState {
	[stateName: string]: IState;
}
export interface IStates {
	items: { [stateName: string]: IState };
}
export interface IIntent {
	// storeName: string;
	areaName: string;
	viewType: string;
	instanceId?: "new" | "last" | string | null | undefined;
	// instanceType?: InstanceTypeProtocol;
	viewState?: any | null;
	title?: string | null;
}
export interface INavState {
	// storeName?: string;
	areaName: string;
	viewType: string;
	instanceId?: "new" | "last" | string | null | undefined;
	url?: string;
	// intent?: IIntent; // navitation intent is always by id
	title?: string;
	viewState?: any | null;
}
