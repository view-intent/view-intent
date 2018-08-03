import * as React from "react";
import { IIntent, IViewInfo } from "./types";
import { ViewState } from "./view-intent-state";
import Component from "./component";
export declare abstract class View<TProps extends View.IProps, TState extends View.IState> extends Component<TProps, TState> implements View.IView<TProps, TState> {
    abstract viewInfo: IViewInfo;
    abstract state: TState;
    viewState: ViewState | null;
    readonly viewClassName: string;
    constructor(props: TProps);
    ref<T extends React.Component | {
        [key: string]: any;
    }>(refName: string): T;
    updateViewState(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(newProp: TProps): void;
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
