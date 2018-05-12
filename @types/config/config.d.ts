export interface IConfigOptions {
    element?: string | HTMLElement;
    loaderSrc?: string;
}
export declare namespace Config {
    let options: IConfigOptions;
    function set(configOptions: IConfigOptions): void;
}
