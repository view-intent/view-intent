import * as React from "react";
import * as ReactDOM from "react-dom";
import Field from "../field/field";
import ViewIntent from "../../../view-intent/main";
// import "./.scss";
import { process } from "uniqid";
import "./selectbox-modal";

// const loadCss = require("load-css-file");
// // loadCss("D:\\dan2dev\\view-intent\\src\\ui\\form\\selectbox\\selectbox.css");

export class Selectbox extends React.Component<Selectbox.IProps, Selectbox.IState> {
  public buttonRef = React.createRef<HTMLDivElement>();
  public uniqueId: string = process();
  public state: Selectbox.IState = {
  };
  constructor(props: Selectbox.IProps) {
    super(props);
    this.viewResponse.bind(this);
    console.log("uniqueId: " + this.uniqueId);
  }
  public viewResponse(data: any) {
    console.log("response - ", data);
  }
  public render(): JSX.Element {
    return <Field
      type="selectbox"
      className={"viui-selectbox"}>
      <div ref={this.buttonRef} onClick={() => {
        ViewIntent.intentView({ areaName: "viui", viewType: "SelectboxModal", instanceId: this.uniqueId }, {}, this.viewResponse);
      }}>
        <span>\/ ---xx {this.uniqueId}</span>
      </div>
    </Field>;
  }
}

export namespace Selectbox {
  export interface IProps {
  }
  export interface IState {
  }
}

export default Selectbox;
