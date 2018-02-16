import { IIntent, IUrlDataIntent } from "./types";
export declare namespace Helper {
    function toUrlDataIntent(url: string): IUrlDataIntent;
    function isViewIntentUrl(url: string): boolean;
    function isViewIntentPath(path: string): boolean;
    function getStoreName(areaName: string, typeName: string): string;
    function pathToIntent(url: string): IIntent;
    function pathToIntent(url: string, viewState: any): IIntent;
    function pathToIntent(intent: IIntent): IIntent;
    function pathToIntent(intent: IIntent, viewState: any): IIntent;
    function pathToIntent(intentOrUrl: IIntent | string, viewState: any): IIntent;
    function removeSharp(url: string | any): string;
}
export default Helper;
