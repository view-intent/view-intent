import * as React from "react";
import { View } from "./view";
import { ViewIntentState, ViewState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
// import { IObserver } from "observable";
import { IObserver } from "abstract-observable";
import { CSSProperties } from "react";
import { Nav } from "./nav";

export class ViewFrame extends React.Component<ViewFrame.IProps, ViewFrame.IState> implements IObserver {
  public state: ViewFrame.IState = {
    isRoot: this.props.root,
    id: this.props.id,
  };
  private mounted: boolean = false;
  private unobserve: (() => void) | null = null;
  constructor(props: ViewFrame.IProps) {
    super(props);
    if (this.state.isRoot === true) {
      this.state.id = "root";
      ViewFrame.rootDefined = true;
    } else if (this.state.id === undefined || this.state.id === null) {
      throw new Error("View Frame must have an id.");
    } else if (this.state.id.toLowerCase() === "root") {
      this.state.isRoot = true;
      ViewFrame.rootDefined = true;
    }
    if (ViewFrame.rootDefined === false) {
      throw new Error(`The root "ViewFrame" wasn't defined.`);
    }
  }
  public notify(): void {
    this.forceUpdate();
    // TODO: implements shouldComponentUpdate()
  }
  public componentWillMount() {
    this.unobserve = ViewIntentState.Instance.subscribe(this);
  }
  public componentDidMount() {
    this.mounted = true;
  }
  public componentWillUnmount() {
    this.unobserve!();
    this.mounted = false;
  }
  public renderViewList(): React.ReactNode | JSX.Element | null {
    const stateId = this.state.id as string;
    const r = ViewIntentState.Instance.getViewStateListByFrameId(stateId)
      .map((viewState: ViewState, index: number) => {
        let ViewRenderComponent: typeof View;
        ViewRenderComponent = ViewTypeStore.getViewType(viewState.areaName, viewState.viewType);
        if (viewState.visible) {
          return <ViewRenderComponent viewState={viewState} key={viewState.getViewInstanceAddress()} />;
        }
      });
    if (r !== undefined) {
      return r;
    } else {
      return [];
    }
  }
  public render(): React.ReactNode {
    return <div
      key={this.props.id}
      id={this.props.id}
      style={this.props.style}
      className={(this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame"}>
      {this.renderViewList()}
    </div>;
  }
}
export namespace ViewFrame {
  export let rootDefined: boolean = false;
  export interface IProps {
    root?: boolean;
    id: string;
    className?: string;
    style?: CSSProperties;
  }
  export interface IState {
    isRoot?: boolean;
    id?: string;
  }
}
export default ViewFrame;
