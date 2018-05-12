import * as React from "react";
import * as ReactDOM from "react-dom";
import { View } from "./view";
import { IViewInfo } from "./types";

// import { View, ViewIntent, IViewInfo } from "view-intent";
// import { RootStore } from "tonolucro-delivery-state";
// import "./none.scss";

export class ViewNotFound extends View<ViewNotFound.IProps, ViewNotFound.IState> {
  public viewInfo = ViewNotFound.viewInfo;
  public state: ViewNotFound.IState = {
  };
  constructor(props: ViewNotFound.IProps) {
    super(props);
    // this.bindStore(putRootStoreInstanceHere);
  }
  public render(): JSX.Element {
    return <div className={"rows rh-12 rw-12"}><div>View Not Found</div></div>;
  }
}
export namespace ViewNotFound {
  export const viewInfo: IViewInfo = {
    area: "default",
    name: "ViewNotFound",
    type: ViewNotFound,
    frameId: "root",
    require: [],
  };
  export interface IProps extends View.IProps {
    className?: string;
  }
  export interface IState extends View.IState {
  }
}
