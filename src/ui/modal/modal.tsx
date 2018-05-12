import * as React from "react";
import * as ReactDOM from "react-dom";
import { View, ViewIntent, IViewInfo } from "../../view-intent/main";
// import "./.scss";

export class Modal extends View<Modal.IProps, Modal.IState> {
    public viewInfo = Modal.viewInfo;
    public state: Modal.IState = {
    };
    constructor(props: Modal.IProps) {
        super(props);
        // this.bindStore(putRootStoreInstanceHere);
    }
    public render(): JSX.Element {
        return <div className={" " + this.props.className}>global.Modal</div>;
    }
}
export namespace Modal {
    export const viewInfo: IViewInfo = {
       area: "global",
       name: "Modal",
       type: Modal,
       frameId: "root",
       require: [],
    };
    export interface IProps extends View.IProps {
        className?: string;
    }
    export interface IState extends View.IState {
    }
}
ViewIntent.registerViewType(Modal.viewInfo);
