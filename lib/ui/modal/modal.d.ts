/// <reference types="@types/react" />
import { View, IViewInfo } from "../../view-intent/main";
export declare class Modal extends View<Modal.IProps, Modal.IState> {
    viewInfo: any;
    state: Modal.IState;
    constructor(props: Modal.IProps);
    render(): JSX.Element;
}
export declare namespace Modal {
    const viewInfo: IViewInfo;
    interface IProps extends View.IProps {
        className?: string;
    }
    interface IState extends View.IState {
    }
}
