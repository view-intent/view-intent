import { IResponseOptions } from "ajax-worker/@types/interfaces";
export declare namespace DataFetch {
    let origin: string | undefined;
    function get<T>(url: string, data?: {
        [prop: string]: string | number | boolean | any;
    } | any): Promise<IResponseOptions<T>>;
    function post<T>(url: string, data?: {
        [prop: string]: string | number | boolean | any;
    } | any): Promise<IResponseOptions<T>>;
    function put<T>(url: string, data?: {
        [prop: string]: string | number | boolean | any;
    } | any): Promise<IResponseOptions<T>>;
    function patch<T>(url: string, data?: {
        [prop: string]: string | number | boolean | any;
    } | any): Promise<IResponseOptions<T>>;
    function del<T>(url: string, data?: {
        [prop: string]: string | number | boolean | any;
    } | any): Promise<IResponseOptions<T>>;
}
export default DataFetch;
