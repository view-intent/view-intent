/// <reference types="@types/react" />
import { View, IViewInfo } from "../../../view-intent/main";
export declare class SelectboxModal extends View<SelectboxModal.IProps, SelectboxModal.IState> {
    viewInfo: IViewInfo;
    state: SelectboxModal.IState;
    constructor(props: SelectboxModal.IProps);
    render(): JSX.Element;
}
export declare namespace SelectboxModal {
    const viewInfo: IViewInfo;
    interface IProps extends View.IProps {
        className?: string;
    }
    interface IState extends View.IState {
    }
}
