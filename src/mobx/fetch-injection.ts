export type FetchAction = (url: string) => void;
export namespace FetchInjection {
  export interface IFetchCallback {
    onSuccess: (url: string) => void;
    onError: (url: string) => void;
  }
  let fetchAction: FetchAction = (url: string) => {
    console.warn(`could not load the ${url} because you didn't register the fetch action.`);
  };
  export function registerFetchAction(action: FetchAction) {
    fetchAction = action;
  }
  export function getFetchAction(): FetchAction {
    return fetchAction;
  }
}
