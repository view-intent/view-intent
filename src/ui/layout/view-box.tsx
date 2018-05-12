import * as React from "react";
import * as ReactDOM from "react-dom";
import { Box } from "./box";
// import "./.scss";

export class ViewBox extends React.Component<ViewBox.IProps, ViewBox.IState> {
  public state: ViewBox.IState = {
  };
  constructor(props: ViewBox.IProps) {
    super(props);
    this.renderTitle.bind(this);
  }
  public renderTitle(): React.ReactNode {
    return [
      <div className="-title-name">{this.props.title}</div>,
      <div className="-title-action"></div>,
    ];
  }
  public render(): JSX.Element {
    return <Box title={this.props.title}>{this.props.children}</Box>;
  }
}
export namespace ViewBox {
  export interface IProps {
    title?: React.ReactNode;
    closeButton?: boolean;
    className?: string[];
  }
  export interface IState {

  }
}
export default ViewBox;
