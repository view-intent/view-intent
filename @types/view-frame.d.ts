/// <reference types="@types/react" />
import * as React from "react";
export declare class ViewFrame extends React.Component<ViewFrame.IProps, ViewFrame.IState> {
    state: ViewFrame.IState;
    private unobserve;
    constructor(props: ViewFrame.IProps);
    componentWillMount(): void;
    componentWillUnmount(): void;
    renderViewList(): JSX.Element[];
    render(): JSX.Element;
}
export declare namespace ViewFrame {
    let rootDefined: boolean;
    interface IProps {
        root?: boolean;
        id?: string;
        className?: string;
        stack?: "x" | "y" | "z" | undefined;
    }
    interface IState {
        isRoot?: boolean;
        id?: string;
    }
}
export default ViewFrame;
