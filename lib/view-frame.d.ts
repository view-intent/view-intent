/// <reference types="@types/react" />
import * as React from "react";
import { IObserver } from "abstract-observable";
export declare class ViewFrame extends React.Component<ViewFrame.IProps, ViewFrame.IState> implements IObserver {
    state: ViewFrame.IState;
    private mounted;
    private unobserve;
    constructor(props: ViewFrame.IProps);
    notify(): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderViewList(): Array<JSX.Element | undefined>;
    render(): JSX.Element;
}
export declare namespace ViewFrame {
    let rootDefined: boolean;
    interface IProps {
        root?: boolean;
        id: string;
        className?: string;
    }
    interface IState {
        isRoot?: boolean;
        id?: string;
    }
}
export default ViewFrame;