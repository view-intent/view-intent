import { IIntent, INavState } from "./main-types";
export declare namespace Nav {
    function intentViewAndRequest(url: string, intent?: IIntent): void;
    function intentViewAndPost(url: string, data: any, intent?: IIntent): void;
    function goback(): void;
    function start(intent: IIntent): void;
    function intentView(intent: IIntent, url: string, title?: string): void;
    function intentViewPop(state: INavState): void;
}
