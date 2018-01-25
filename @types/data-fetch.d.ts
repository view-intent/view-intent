export declare namespace DataFetch {
    function get(url: string, data?: {
        [prop: string]: string | number | boolean;
    }): void;
    function post(url: string, data?: {
        [prop: string]: string | number | boolean;
    }): void;
    function put(url: string, data?: {
        [prop: string]: string | number | boolean;
    }): void;
    function patch(url: string, data?: {
        [prop: string]: string | number | boolean;
    }): void;
    function del(url: string, data?: {
        [prop: string]: string | number | boolean;
    }): void;
}
export default DataFetch;
