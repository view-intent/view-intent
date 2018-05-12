import * as React from "react";
import * as ReactDOM from "react-dom";
import { View, ViewIntent, IViewInfo } from "../../../view-intent/main";

export class SelectboxModal extends View<SelectboxModal.IProps, SelectboxModal.IState> {
  public viewInfo = SelectboxModal.viewInfo;
  public state: SelectboxModal.IState = {
  };
  constructor(props: SelectboxModal.IProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div className={" " + this.props.className}>
      <button onClick={() => {ViewIntent.back(); }}>voltar - {this.viewState!.instanceId}</button>
    </div>;
  }
}
export namespace SelectboxModal {
  export const viewInfo: IViewInfo = {
    area: "viui",
    name: "SelectboxModal",
    type: SelectboxModal,
    frameId: "root",
    require: "stack",
  };
  export interface IProps extends View.IProps {
    className?: string;
  }
  export interface IState extends View.IState {
  }
}
console.log("selectbox modal");
ViewIntent.registerViewType(SelectboxModal.viewInfo);
