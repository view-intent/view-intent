/// <reference types="@types/react" />
import * as React from "react";
import { IIntent, IViewInfo } from "./types";
import { ViewState } from "./view-intent-state";
export declare abstract class View<TProps extends View.IProps, TState extends View.IState> extends React.Component<TProps, TState> implements View.IView<TProps, TState> {
    abstract viewInfo: IViewInfo;
    abstract state: TState;
    viewState: ViewState | null;
    loadingClassName: string;
    private _isMounted;
    readonly viewClassName: string;
    readonly isMounted: boolean;
    private mobxInstances;
    private mobxUnregiters;
    constructor(props: TProps);
    classNames(classNamesList: string[], loader?: boolean): string;
    ref<T extends React.Component | {
        [key: string]: any;
    }>(refName: string): T;
    bindStore(instance: any): void;
    componentDidMount(): void;
    componentWillMount(): void;
    updateViewState(): void;
    componentWillReceiveProps(newProp: TProps): void;
    componentWillUnmount(): void;
    abstract render(): React.ReactNode | JSX.Element | JSX.Element[];
}
export declare namespace View {
    interface IState {
    }
    interface IProps {
        instanceId?: string;
        visible?: boolean;
        viewState?: ViewState;
    }
    interface IView<TProps extends IProps, TState extends IState> {
    }
    interface IViewConstructor {
        require?: () => IIntent[];
        new (...args: any[]): View<any, any>;
    }
    interface IViewMeasures {
        mobile?: IViewMeasure;
        tablet?: IViewMeasure;
        desktop?: IViewMeasure;
    }
    interface IViewMeasure {
        width?: number | string;
        height?: number | string;
    }
}
export default View;
