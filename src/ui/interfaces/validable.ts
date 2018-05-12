export type IValidableType = () => React.Component<{ validation: any }, any>;
export interface IValidableComponent extends IValidableType {
  isValid: () => boolean;
  valid: (response: IValidationResponse) => void;
}
export interface IValidationResponse {
  type: "success" | "error" | "warning" | "info";
  message?: string;
}

// export type IVali = () => React.Component<{validation: }, Textbox.IState>;
// export interface IValidableComponent extends IValidableComponent {
// 	(): React.Component<{ validation: any }, any>;
// 	isValid: () => boolean;
// 	valid: (response: IValidableResponse) => void;
// }
export interface IValidableProp {
  //
}
export interface IValidablePropList {
  // [index: number]: () => IValidablePropResponse;
}
