import { IIntent, IUrlDataIntent } from "./types";
export declare namespace Helper {
    function toUrlDataIntent(url: string, intentUrl?: string): IUrlDataIntent;
    function isViewIntentPath(path: string): boolean;
    function getStoreName(areaName: string, typeName: string): string;
    function pathToIntent(intentUrl: string): IIntent;
    function pathToIntent(intentUrl: string, viewState: any): IIntent;
    function pathToIntent(intent: IIntent): IIntent;
    function pathToIntent(intent: IIntent, viewState: any): IIntent;
    function pathToIntent(intent: IIntent | string | null, viewState: any): IIntent;
}
export default Helper;
