/// <reference types="@types/react" />
import { View } from "./main";
export declare class ViewNotFound extends View<ViewNotFound.IProps, ViewNotFound.IState, any> {
    state: ViewNotFound.IState;
    constructor(props: ViewNotFound.IProps);
    render(): JSX.Element;
}
export declare namespace ViewNotFound {
    interface IProps extends View.IProps<any> {
    }
    interface IState extends View.IState {
    }
}
