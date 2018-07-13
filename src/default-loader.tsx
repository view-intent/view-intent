import * as React from "react";
import { Component } from "./component";

export class DefaultLoader extends Component<DefaultLoader.IProps, DefaultLoader.IState> {
  public state: DefaultLoader.IState = {
  };
  constructor(props: DefaultLoader.IProps) {
    super(props);
  }
  public render(): React.ReactNode {
    return <div>loading</div>;
  }
}
export namespace DefaultLoader {
  export interface IProps {
  }
  export interface IState {
  }
}
export default DefaultLoader;
