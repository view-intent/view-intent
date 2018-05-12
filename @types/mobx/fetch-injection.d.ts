export declare type FetchAction = (url: string) => void;
export declare namespace FetchInjection {
    interface IFetchCallback {
        onSuccess: (url: string) => void;
        onError: (url: string) => void;
    }
    function registerFetchAction(action: FetchAction): void;
    function getFetchAction(): FetchAction;
}
