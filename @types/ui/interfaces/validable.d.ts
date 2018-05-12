/// <reference types="@types/react" />
export declare type IValidableType = () => React.Component<{
    validation: any;
}, any>;
export interface IValidableComponent extends IValidableType {
    isValid: () => boolean;
    valid: (response: IValidationResponse) => void;
}
export interface IValidationResponse {
    type: "success" | "error" | "warning" | "info";
    message?: string;
}
export interface IValidableProp {
}
export interface IValidablePropList {
}
