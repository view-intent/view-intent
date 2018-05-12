import * as React from "react";
import * as ReactDOM from "react-dom";
// import "./.scss";
const loadCss = require("load-css-file");
// loadCss("file:///D:/dan2dev/view-intent/src/ui/layout/box.css");
// import "./box.css";

export class Box extends React.Component<Box.IProps, Box.IState> {
  public state: Box.IState = {
  };
  constructor(props: Box.IProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div className={"viui-box"}>
      <div className={"viui-box__title"}>{this.props.title}</div>
      <div className={"viui-box__body"}>{this.props.children}</div>
    </div>;
  }
}
export namespace Box {
  export interface IProps {
    title?: React.ReactNode;
    className?: string[];
  }
  export interface IState {
  }
}
export default Box;
