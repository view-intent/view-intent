/// <reference types="@types/react" />
import * as React from "react";
import { IIntent } from "./main-types";
export declare abstract class View<TProps extends View.IProps<TStore>, TState extends View.IState, TStore> extends React.Component<TProps, TState> implements View.IView<TProps, TState, TStore> {
    abstract state: TState;
    observables: {
        [typeName: string]: any;
    };
    constructor(props: TProps);
    inject(state: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    abstract render(): JSX.Element;
}
export declare namespace View {
    interface IState {
    }
    interface IProps<TStore> {
        store?: TStore;
        instanceId?: string;
        visible?: boolean;
    }
    interface IView<TProps extends IProps<TStore>, TState extends IState, TStore> {
        inject: (newState: TState) => void;
    }
    interface IViewConstructor {
        require?: () => IIntent[];
        new (...args: any[]): View<any, any, any>;
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
