import { INavState, IIntent } from "./types";
import { Url } from "utility-collection";

export namespace WindowHistoryHelper2 {
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
      let newUrl: string | undefined | null;
      if (currentState.url !== undefined && currentState.url !== null) {
        const urlMaker = new Url(currentState.url);
        urlMaker.setOrigin(window.location.origin, false);
        newUrl = urlMaker.toString();
      } else {
        newUrl = currentState.url;
      }
      window.history.replaceState(currentState, currentState.title || undefined, newUrl);
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
