export var Config;
(function (Config) {
    Config.options = {
    // loader: DefaultLoader,
    };
    Config.initialized = false;
    function set(configOptions) {
        if (Config.initialized) {
            return;
        }
        Config.initialized = true;
        if (configOptions !== undefined && configOptions !== null) {
            // ViewIntent.config(configOptions);
            Config.options = Object.assign(Config.options, configOptions);
        }
    }
    Config.set = set;
})(Config || (Config = {}));
// // export namespace Main {
// // }
// export function config(configOptions: IConfigOptions): void {
//   if (configOptions !== undefined && configOptions !== null) {
//     // ViewIntent.config(configOptions);
//     Config.options = Object.assign(Config.options, configOptions);
//   }
// }
//# sourceMappingURL=config.js.map