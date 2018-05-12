/// <reference types="@types/react" />
import * as React from "react";
export declare class ViewBox extends React.Component<ViewBox.IProps, ViewBox.IState> {
    state: ViewBox.IState;
    constructor(props: ViewBox.IProps);
    renderTitle(): React.ReactNode;
    render(): JSX.Element;
}
export declare namespace ViewBox {
    interface IProps {
        title?: React.ReactNode;
        closeButton?: boolean;
        className?: string[];
    }
    interface IState {
    }
}
export default ViewBox;
