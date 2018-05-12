/// <reference types="@types/react" />
import * as React from "react";
import "./selectbox-modal";
export declare class Selectbox extends React.Component<Selectbox.IProps, Selectbox.IState> {
    buttonRef: React.RefObject<HTMLDivElement>;
    uniqueId: string;
    state: Selectbox.IState;
    constructor(props: Selectbox.IProps);
    viewResponse(data: any): void;
    render(): JSX.Element;
}
export declare namespace Selectbox {
    interface IProps {
    }
    interface IState {
    }
}
export default Selectbox;
