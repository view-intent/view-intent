import View from "./view";
export declare namespace ViewTypeStore {
    interface IViewTypeInfo {
        storeName: string;
        areaName: string;
        viewType: View.IViewConstructor;
        typeName: string;
        frameId: string;
        require: string[];
    }
    function registerViewType(areaName: string, viewType: View.IViewConstructor, frameId: string, require?: string[]): void;
    function getViewTypeByStoreName(storeName: string): View.IViewConstructor;
    function getViewType(areaName: string, typeName: string): View.IViewConstructor;
    function getViewTypeInfo(areaName: string, typeName: string): IViewTypeInfo;
}
