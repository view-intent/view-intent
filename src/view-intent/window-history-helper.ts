import { INavState, IIntent } from "./types";

export namespace WindowHistoryHelper {
  export function getCurrentState(): INavState | null {
    const currentNavState: INavState = window.history.state;
    if (currentNavState && currentNavState.areaName && currentNavState.viewType && currentNavState.instanceId) {
      return currentNavState;
    } else {
      return null;
    }
  }
  export function setCurrentStateViewAddresses(viewAddress: string[]): void {
    const currentState = getCurrentState();
    if (currentState) {
      currentState.visibleViewStates = viewAddress;
      window.history.replaceState(currentState, currentState.title || undefined, currentState.url);
    }
  }
  export function NavStateToIntent(state: INavState | null): IIntent | null {
    if (state === null || state === undefined) {
      return null;
    } else {
      const intent: IIntent = {
        areaName: state.areaName,
        instanceId: state.instanceId,
        viewType: state.viewType,
        viewState: state.viewState,
      };
      return intent;
    }
  }
}
