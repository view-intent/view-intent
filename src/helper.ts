import { IIntent, IUrlDataIntent, INavState } from "./types";
import { Is } from "utility-collection";

export namespace Helper {
  export function toUrlDataIntent(url: string | null): IUrlDataIntent {
    const dataIntent: IUrlDataIntent = {
      url,
      intentUrl: null,
      intent: null,
    };
    if (url !== null && url !== undefined) {
      if (url.indexOf("#") > -1) {
        const splited = url.split("#");
        if (isViewIntentPath(splited[1])) {
          dataIntent.intentUrl = splited[1];
          dataIntent.intent = pathToIntent(dataIntent.intentUrl);
          dataIntent.url = splited[0];
          if (dataIntent.url === "") {
            dataIntent.url = null;
          }
        }
      }
    }
    return dataIntent;
  }
  export function isViewIntentUrl(url: string) {
    if (Is.nullOrUndefined(url)) {
      return false;
    }
    const splited = url.split("#");
    if (splited.length < 2) {
      return false;
    } else {
      const viewIntentPath: string = splited[1];
      if (isViewIntentPath(viewIntentPath)) {
        return true;
      } else {
        return false;
      }
    }
  }
  export function isViewIntentPath(path: string) {
    return true;
    // const pathArray = path.split(".");
    // if (pathArray.length === 2) {
    //   return true;
    // } else {
    //     return false;
    // }
  }
  const dashRegExp = new RegExp("-", "g");
  export function getStoreName(areaName: string, typeName: string): string {
    areaName = areaName.replace(dashRegExp, "");
    typeName = typeName.replace(dashRegExp, "");
    return (areaName + "." + typeName).toLowerCase();
  }
  export function navStateToIntent(navIntent: INavState): IIntent {
    const newIntent: IIntent = {
      areaName: navIntent.areaName,
      viewType: navIntent.viewType,
      instanceId: navIntent.instanceId,
      viewState: navIntent.viewState,
    };
    return newIntent;
  }
  export function intentToViewInstanceAddress(intent: IIntent): string {
    return `${intent.areaName}.${intent.viewType}:${intent.instanceId}`;
  }
  export function getViewInstanceAddress(areaName: string, viewType: string, instanceId: string): string {
    return (`${this.areaName}.${this.viewType}:${this.instanceId}`).toLowerCase();
  }
  export function pathToIntent(url: string): IIntent;
  export function pathToIntent(url: string, viewState: any): IIntent;
  export function pathToIntent(intent: IIntent): IIntent;
  export function pathToIntent(intent: IIntent, viewState: any): IIntent;
  export function pathToIntent(intentOrUrl: IIntent | string, viewState: any): IIntent;
  export function pathToIntent(intentOrUrl: IIntent | string, viewState: any = null): IIntent | null {
    if (intentOrUrl === null || intentOrUrl === undefined) {
      return null;
    }
    let newIntent: IIntent;
    if (typeof intentOrUrl === "string") {
      let intentPath: string = intentOrUrl;
      if (intentOrUrl.indexOf("#") > -1) {
        intentPath = intentOrUrl.split("#")[1];
      }
      if (intentPath.indexOf("/") > -1) {
        return null;
      }
      const pathArray = intentPath.split(".");
      let areaName: string;
      let viewType: string;
      let instanceId: "last" | "new" | string = "last";
      // let instanceType: InstanceTypeProtocol = InstanceTypeProtocol.lastInstance;
      // -------------------
      if (pathArray.length < 2) {
        return pathToIntent(intentOrUrl.replace("#", "#global."), viewState);
      } else {
        const TypePathArray: string[] = pathArray[1].split(":");
        if (TypePathArray.length > 1) {
          instanceId = TypePathArray[1].toLowerCase();
        } else {
          instanceId = "last";
        }
        areaName = pathArray[0].toLowerCase();
        viewType = TypePathArray[0].toLowerCase();
      }
      // -------------------
      newIntent = {
        areaName,
        instanceId,
        viewType,
        viewState,
      };
      return newIntent;
    } else {
      newIntent = intentOrUrl as IIntent;
      if (viewState !== null && viewState !== undefined) {
        newIntent.viewState = viewState;
      }
    }
    return newIntent;
  }
  export function removeSharp(url: string | any) {
    if (typeof url === "string") {
      if (url.indexOf("#") > -1) {
        return url.split("#")[0];
      } else {
        return url;
      }
    } else {
      return null;
    }
  }
}
export default Helper;
