/// <reference types="@types/react" />
export interface IConfigOptions {
    element?: string | HTMLElement;
    loader?: React.ReactNode;
    apiOrigin?: string;
}
export declare namespace Config {
    let options: IConfigOptions;
    let initialized: boolean;
    function set(configOptions: IConfigOptions): void;
}
