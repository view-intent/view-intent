/// <reference types="@types/react" />
import * as React from "react";
export declare class Box extends React.Component<Box.IProps, Box.IState> {
    state: Box.IState;
    constructor(props: Box.IProps);
    render(): JSX.Element;
}
export declare namespace Box {
    interface IProps {
        title?: React.ReactNode;
        className?: string[] | string;
    }
    interface IState {
    }
}
export default Box;
