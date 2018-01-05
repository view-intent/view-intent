import { IIntent } from "./main-types";
export declare namespace Helper {
    function isViewIntentPath(path: string): boolean;
    function getStoreName(areaName: string, typeName: string): string;
    function pathToIntent(intent: IIntent | string | null, viewState?: any): IIntent;
}
export default Helper;
