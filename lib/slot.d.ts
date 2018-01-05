/// <reference types="@types/react" />
import * as React from "react";
import "./framebox.scss";
export declare class Slot extends React.Component<Slot.IProps, Slot.IState> {
    state: Slot.IState;
    constructor(props: Slot.IProps);
    shouldComponentUpdate(nextProps: Slot.IProps, nextState: Slot.IState): boolean;
    render(): JSX.Element;
}
export declare namespace Slot {
    interface IProps {
    }
    interface IState {
    }
}
export default Slot;
