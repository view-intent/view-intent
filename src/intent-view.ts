import { IIntent } from "./types";
import Helper from "./helper";
import { Is } from "utility-collection";
import DataFetch from "./data-fetch";
import { Nav } from "./nav";

export function intentView(intent: IIntent, viewState?: any, callback?: ((data: any) => void) | null): void;
export function intentView(url: string, viewState?: any, callback?: ((data: any) => void) | null): void;
export function intentView(intentOrUrl: IIntent | string, viewState: any = null, callback: ((data: any) => void) | null = null): void {
  const intent: IIntent = Helper.pathToIntent(intentOrUrl, viewState);
  const url: string | null = Helper.removeSharp(intentOrUrl);
  if (!Is.empty(url)) {
    DataFetch.get(url!, undefined);
  }
  if (intent != null) {
    Nav.intentView(intent, url!, callback);
  }
}
