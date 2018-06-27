export interface IConfigOptions {
    element?: string | HTMLElement;
    loaderSrc?: string;
    apiOrigin?: string;
}
export declare namespace Config {
    let options: IConfigOptions;
    let initialized: boolean;
    function set(configOptions: IConfigOptions): void;
}
