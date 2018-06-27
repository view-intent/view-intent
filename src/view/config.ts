export interface IConfigOptions {
  element?: string | HTMLElement;
  loaderSrc?: string;
  apiOrigin?: string;
}
export namespace Config {
  export let options: IConfigOptions = {};
  export let initialized: boolean = false;
  export function set(configOptions: IConfigOptions): void {
    if (initialized) {
      return;
    }
    initialized = true;
    if (configOptions !== undefined && configOptions !== null) {
      // ViewIntent.config(configOptions);
      Config.options = Object.assign(Config.options, configOptions);
      console.log(Config.options);
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
