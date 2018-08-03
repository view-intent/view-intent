import * as React from "react";
import { IObserver, Observable } from "abstract-observable";
import { IIntent } from "./types";
export declare abstract class Component<IProps, IState> extends React.Component<IProps, IState> implements IObserver {
    loadingClassName: string;
    readonly isLoading: boolean;
    private _loading;
    private _loadingClassName;
    private _unregisterObservables;
    private _isMounted;
    private _observable;
    constructor(props: IProps);
    subscribe(observer: (() => void) | IObserver): () => void;
    loading(): void;
    loaded(): void;
    notify(): void;
    intentView(intent: IIntent, viewState?: any, callback?: ((data: any) => void) | null): (event: any) => void;
    intentView(url: string, viewState?: any, callback?: ((data: any) => void) | null): (event: any) => void;
    joinClass(classNames: Array<string | undefined | null> | string, loader?: boolean): string;
    readonly isMounted: boolean;
    observe(observableInstance: Observable): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    abstract render(): React.ReactNode;
    private notifyAllObservers;
}
export default Component;
