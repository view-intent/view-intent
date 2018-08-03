import { IViewInfo } from "./types";
export interface IConfigOptions {
    element?: string | HTMLElement;
    loader?: React.ReactNode;
    apiOrigin?: string;
    notFound?: IViewInfo;
}
export declare namespace Config {
    let options: IConfigOptions;
    let initialized: boolean;
    function set(configOptions: IConfigOptions): void;
}
