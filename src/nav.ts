import { AjaxWorker } from "ajax-worker";
import * as lodash from "lodash";
import { process, time } from "uniqid";
import { Is, Url } from "utility-collection";
import { IIntent, INavState, IUrlDataIntent } from "./types";
import { ViewIntentState, ViewState, WindowHistoryHelper } from "./view-intent-state";
import { Helper } from "./helper";
import { setTimeout } from "timers";
// import { WindowHistoryHelper } from "./window-history-helper";
// console.log("windowH", WindowHistoryHelper);

export namespace Nav {
  const self = Nav;
  let navWaiting: boolean = false;
  let lastIntent: IIntent | null = null;
  let prevIntent: IIntent | null = null;

  export function navWait(intent: IIntent): boolean {
    if (Is.nullOrUndefined(intent)) {
      return false;
    }
    if (lastIntent !== null) {
      if (intent.viewType !== lastIntent.viewType || intent.areaName !== lastIntent.areaName) {
        lastIntent = intent;
        return false;
      } else {
        if (navWaiting === false) {
          navWaiting = true;
          setTimeout(() => {
            navWaiting = false;
          }, 150);
          lastIntent = intent;
          return false;
        } else {
          return true;
        }
      }
    } else {
      lastIntent = intent;
      return false;
    }
  }
  export function goback() {
    window.history.back();
  }
  export function start(): void;
  export function start(intent: IIntent | null): void;
  export function start(intent: IIntent | null | undefined = null): void {
    let url: string | null = null;
    if (intent === undefined || intent === null) {
      const urlDataIntent: IUrlDataIntent = Helper.toUrlDataIntent(url);
      intent = urlDataIntent.intent;
      url = urlDataIntent.url;
    }
    if (intent !== null && intent !== undefined) {
      if (url === undefined || url === null) {
        url = window.location.href;
      }
      intentView(intent, url);
    }
    // window.addEventListener("popstate", (e) => {
    // 	intentViewPop(e.state);
    // });
    // window.onpopstate = (e: PopStateEvent) => {
    // 	intentViewPop(e.state);
    // };
  }
  const intentViewLastIntent: any = {};
  export function intentView(intent: IIntent, url: string, callback: ((data: any) => void) | null = null ): void {
    if (navWait(intent)) { return; }
    if (intent === undefined || intent === null) {
      return;
    }
    if (intent.viewType === "" || intent.viewType === undefined || intent.viewType === null ||
      intent.areaName === "" || intent.areaName === undefined || intent.areaName === null) {
      return;
    }
    // generate or getInstance
    let instanceId: string | undefined | null = intent.instanceId;
    let viewState: ViewState | null = null;
    viewState = ViewIntentState.Instance.getViewStateByIntent(intent);
    if (viewState !== null) {
      intent.instanceId = instanceId = viewState.instanceId;
    }
    // if (instanceId === null || instanceId === undefined || instanceId === "last") { 
    //   viewState = ViewIntentState.Instance.getLastViewStateByType(intent.areaName, intent.viewType);
    // } else if (instanceId !== "new") {
    //   viewState = ViewIntentState.Instance.getViewStateById(intent);
    // }
    // if (viewState !== null && viewState !== undefined) {
    //   intent.instanceId = instanceId = viewState.instanceId;
    // } else {
    //   intent.instanceId = instanceId = process();
    //   viewState = ViewIntentState.Instance.getViewStateById(intent);
    // }
    // console.log("viewState: ", viewState);
    
    // viewType ------------
    let viewType: string = intent.viewType;
    if (viewType !== null && viewType !== undefined) {
      viewType = viewType.toLowerCase();
      viewType = viewType.replace(/-/g, "");
    }
    const navState: INavState = {
      areaName: intent.areaName,
      instanceId,
      viewType: intent.viewType,
      title: intent.title,
      url: (Is.nullOrUndefined(intent.redirect) ? url : intent.redirect),
      viewState: intent.viewState,
      visibleViewStates: null,
    };
    // should replace ----------------------------
    let shouldReplace: boolean = (window.history.state === undefined || window.history.state === null || intent.replaceState === true);
    let shouldNavigate: boolean = true;
    const currentNavState: INavState | null = WindowHistoryHelper.getCurrentState(); // window.history.state;
    if (!shouldReplace && currentNavState) {
      if (navState.url === null || navState.url === undefined || navState.url === "") {
        // shouldNavigate = false;
      }
      if (currentNavState.viewType === navState.viewType && currentNavState.areaName === navState.areaName && currentNavState.viewState === navState.viewState && navState.url === currentNavState.url) {
        shouldNavigate = false;
      }
      if (currentNavState.url === navState.url && currentNavState.viewType === intent.viewType) {
        shouldReplace = true;
      }
      if (navState.url === window.location.href) {
        shouldReplace = true;
      }
      if (navState.url !== null && navState.url !== undefined && currentNavState.url !== null && currentNavState.url !== undefined) {
        if (navState.url.replace(window.location.origin, "") === currentNavState.url.replace(window.location.origin, "")) {
          shouldReplace = true;
        }
      }
      if (currentNavState.areaName !== navState.areaName || currentNavState.viewType !== navState.viewType) {
        shouldReplace = false;
      }
    }
    // push or replace ---------------------------
    if (shouldNavigate) {
      let pushUrl: string = (!Is.nullOrUndefined(navState.url) ? navState.url as string : "./");
      const pushTitle: string = (!Is.nullOrUndefined(navState.title) ? navState.title as string : document.getElementsByTagName("title")[0].innerText);
      const newPushUrl = new Url(pushUrl);
      newPushUrl.setOrigin(window.location.origin, false);
      pushUrl = newPushUrl.toString();
      prevIntent =  WindowHistoryHelper.NavStateToIntent(WindowHistoryHelper.getCurrentState());
      if (shouldReplace) {
        history.replaceState(navState, pushTitle, pushUrl); 
      } else {
        window.history.pushState(navState, pushTitle, pushUrl);
      }
      ViewIntentState.Instance.processIntent(intent, pushUrl);
    }
  }
  export function intentViewPop(state: INavState): void {
    const intent = WindowHistoryHelper.NavStateToIntent(state);
    if (intent !== null) {
      ViewIntentState.Instance.processPopIntent(state);
    }
  }
}
