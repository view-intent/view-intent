import * as React from "react";
import { IObserver, Observable } from "abstract-observable";
import { IIntent } from "./types";
export declare abstract class Component<IProps, IState> extends React.Component<IProps, IState> implements IObserver {
    loadingClassName: string;
    private _loadingClassName;
    private _unregisterObservables;
    private _isMounted;
    constructor(props: IProps);
    notify(): void;
    intentView(intent: IIntent, viewState?: any, callback?: ((data: any) => void) | null): (event: any) => void;
    intentView(url: string, viewState?: any, callback?: ((data: any) => void) | null): (event: any) => void;
    joinClass(classNames: Array<string | undefined | null> | string, loader?: boolean): string;
    readonly isMounted: boolean;
    observe(observableInstance: Observable): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    abstract render(): React.ReactNode;
}
export default Component;
