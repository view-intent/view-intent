import * as React from "react";
import { IObserver } from "abstract-observable";
import { CSSProperties } from "react";
export declare class ViewFrame extends React.Component<ViewFrame.IProps, ViewFrame.IState> implements IObserver {
    state: ViewFrame.IState;
    private mounted;
    private unobserve;
    constructor(props: ViewFrame.IProps);
    notify(): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderViewList(): React.ReactNode | JSX.Element | null;
    render(): React.ReactNode;
}
export declare namespace ViewFrame {
    let rootDefined: boolean;
    interface IProps {
        root?: boolean;
        id: string;
        className?: string;
        style?: CSSProperties;
    }
    interface IState {
        isRoot?: boolean;
        id?: string;
    }
}
export default ViewFrame;
