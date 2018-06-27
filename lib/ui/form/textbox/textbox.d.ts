/// <reference types="@types/react" />
import * as React from "react";
import { ILoadableComponent } from "../../interfaces/loadable";
import { IValidationResponse } from "../../interfaces/validable";
export declare class Textbox extends React.Component<Textbox.IProps, Textbox.IState> implements ILoadableComponent {
    state: Textbox.IState;
    inputElement: HTMLInputElement | null;
    private debounce;
    constructor(props: Textbox.IProps);
    value: string | number | null | undefined;
    isValid(): boolean;
    readonly isFocus: boolean;
    loading(): void;
    loaded(): void;
    inputChange(): Promise<void>;
    inputFocus(e: FocusEvent): Promise<void>;
    inputBlur(e: Event): Promise<void>;
    inputKeyUp(e: Event): Promise<void>;
    inputKeyDown(e: Event): Promise<void>;
    inputClick(e: Event): Promise<void>;
    isFilled(): boolean;
    isLabeled(): boolean;
    isDisabled(): boolean;
    setInputValue(value: string | number | null | undefined): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(props: Textbox.IProps): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
export declare namespace Textbox {
    interface IProps {
        className?: string;
        label?: string;
        type?: "text" | "password" | "number" | string;
        disabled?: boolean;
        value?: string | number | null | undefined;
        defaultValue?: string | number | null | undefined;
        mask?: string;
        iconSrc?: () => JSX.Element | string | any;
        srcLoader?: string;
        validation?: Array<((value: string) => Promise<IValidationResponse>) | ((value: string) => IValidationResponse)>;
        onEnter?: (textbox: Textbox) => void;
        onFocus?: (textbox: Textbox) => void;
        onBlur?: (textbox: Textbox) => void;
        onClick?: (textbox: Textbox) => void;
        onChange?: (textbox: Textbox) => void;
        onChangeDebounce?: (textbox: Textbox) => void;
        onChangeDebounceDelay?: number;
    }
    interface IState {
        focus: boolean;
        value: string | number | null | undefined;
        loading: boolean;
        mounted: boolean;
    }
}
export default Textbox;
