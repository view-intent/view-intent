export interface IConfigOptions {
  element?: string | HTMLElement;
  loaderSrc?: string;
}
export namespace Config {
  export let options: IConfigOptions = {};
  export function set(configOptions: IConfigOptions): void {
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
