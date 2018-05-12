import { INavState, IIntent } from "./types";
export declare namespace WindowHistoryHelper {
    function getCurrentState(): INavState | null;
    function setCurrentStateViewAddresses(viewAddress: string[]): void;
    function NavStateToIntent(state: INavState | null): IIntent | null;
}
