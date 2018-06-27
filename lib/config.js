"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config;
(function (Config) {
    Config.options = {};
    Config.initialized = false;
    function set(configOptions) {
        if (Config.initialized) {
            return;
        }
        Config.initialized = true;
        if (configOptions !== undefined && configOptions !== null) {
            // ViewIntent.config(configOptions);
            Config.options = Object.assign(Config.options, configOptions);
            console.log(Config.options);
        }
    }
    Config.set = set;
})(Config = exports.Config || (exports.Config = {}));
// // export namespace Main {
// // }
// export function config(configOptions: IConfigOptions): void {
//   if (configOptions !== undefined && configOptions !== null) {
//     // ViewIntent.config(configOptions);
//     Config.options = Object.assign(Config.options, configOptions);
//   }
// }
//# sourceMappingURL=config.js.map