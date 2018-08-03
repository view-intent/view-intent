// import * as Vis from "view-intent-store";
import { IViewInfo } from "./types";

// import { DefaultLoader } from "./default-loader";

export interface IConfigOptions {
  element?: string | HTMLElement;
  loader?: React.ReactNode;
  // loaderSrc?: string;
  apiOrigin?: string;
  notFound?: IViewInfo;
}
export namespace Config {
  export let options: IConfigOptions = {
    // loader: DefaultLoader,
  };
  export let initialized: boolean = false;
  export function set(configOptions: IConfigOptions): void {
    if (initialized) {
      return;
    }
    
    initialized = true;
    if (configOptions !== undefined && configOptions !== null) {
      // ViewIntent.config(configOptions);
      Config.options = Object.assign(Config.options, configOptions);
    }
  }
}
// // export namespace Main {
// // }
// export function config(configOptions: IConfigOptions): void {
//   if (configOptions !== undefined && configOptions !== null) {
//     // ViewIntent.config(configOptions);
//     Config.options = Object.assign(Config.options, configOptions);
//   }
// }
