import * as React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as ReactDOM from "react-dom";
import { View } from "./view";
import { ViewIntentState, ViewState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
import { hot } from "react-hot-loader";

// import "./view-frame.scss";
// import "./view-frame-transitions.scss";
// import { observe } from "mobx";
import { observe, toJS } from "view-intent-mobx";
import * as uniqid from "uniqid";

export class ViewFrame extends React.Component<ViewFrame.IProps, ViewFrame.IState> {
  public state: ViewFrame.IState = {
    isRoot: this.props.root,
    id: this.props.id,
  };
  private unobserve: (() => void) | null = null;
  constructor(props: ViewFrame.IProps) {
    super(props);
    if (this.state.isRoot === true) {
      this.state.id = "root";
      ViewFrame.rootDefined = true;
    } else if (this.state.id === undefined || this.state.id === undefined) {
      throw new Error("View Frame must have an id.");
    } else if (this.state.id.toLowerCase() === "root") {
      this.state.isRoot = true;
      ViewFrame.rootDefined = true;
    }
    if (ViewFrame.rootDefined === false) {
      throw new Error(`The root "ViewFrame" wasn't defined.`);
    }
  }
  public componentWillMount() {
    this.unobserve = observe(ViewIntentState.Instance, (change) => {
      this.forceUpdate();
    });
  }
  public componentWillUnmount() {
    this.unobserve!();
  }

  public renderViewList(): Array<JSX.Element | undefined> {
    const stateId = this.state.id! as string;
    const r = ViewIntentState.Instance.getViewStateListByFrameId(stateId)
      .map((viewState: ViewState, index: number) => {
        // let ViewRenderComponent: View.IViewConstructor | null | any;
        let ViewRenderComponent: typeof View;
        ViewRenderComponent = ViewTypeStore.getViewType(viewState.areaName, viewState.viewType);
        // return (viewState.isVisible ? <ViewRenderComponent key={viewState.instanceId + i++} /> : null);
        if (viewState.isVisible) {
          return <ViewRenderComponent viewState={viewState} key={viewState.areaName + "." + viewState.viewType + ":" + viewState.instanceId} />;
        }
        // return (viewState.isVisible ? <ViewRenderComponent key={i++} /> : null);
      });
    if (r !== undefined) {
      return r;
    } else {
      return [];
    }
  }
  public render(): JSX.Element {
    return <div
      key={this.props.id}
      id={this.props.id}
      className={(this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame"}>
      {this.renderViewList()}
    </div>;
  }
}
export namespace ViewFrame {
  export let rootDefined: boolean = false;
  export interface IProps {
    root?: boolean;
    id?: string;
    className?: string;
  }
  export interface IState {
    isRoot?: boolean;
    id?: string;
  }
}
// export const HotViewFrame: any = hot(module)(ViewFrame);
export default ViewFrame;
