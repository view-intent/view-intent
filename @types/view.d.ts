/// <reference types="@types/react" />
import * as React from "react";
import { IIntent, IViewInfo } from "./types";
export declare abstract class View<TProps extends View.IProps, TState extends View.IState> extends React.Component<TProps, TState> implements View.IView<TProps, TState> {
    abstract viewInfo: IViewInfo;
    abstract state: TState;
    readonly viewClassName: string;
    private mobxInstances;
    private mobxUnregiters;
    constructor(props: TProps);
    bindStore(instance: any): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    abstract render(): JSX.Element;
}
export declare namespace View {
    interface IState {
    }
    interface IProps {
        instanceId?: string;
        visible?: boolean;
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
