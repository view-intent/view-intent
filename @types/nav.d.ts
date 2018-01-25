import { IIntent, INavState } from "./types";
export declare namespace Nav {
    function goback(): void;
    function start(): void;
    function start(intent: IIntent | null): void;
    function intentView(intent: IIntent, url: string, title?: string): void;
    function intentViewPop(state: INavState): void;
}
