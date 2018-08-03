
import * as React from "react";
import { IIntent, IViewInfo } from "./types";
import { ViewState } from "./view-intent-state";
import Component from "./component";

// const equal: (value1: any, value2: any) => boolean = require("deep-equal");

// export abstract class View<TProps extends View.IProps, TState extends View.IState> extends React.Component<TProps, TState> implements View.IView<TProps, TState>  {
export abstract class View<TProps extends View.IProps, TState extends View.IState> extends Component<TProps, TState> implements View.IView<TProps, TState>  {
  public abstract viewInfo: IViewInfo;
  public abstract state: TState;
  public viewState: ViewState | null = null;
  public get viewClassName() {
    return this.viewInfo.area!.toLowerCase() + "-" + this.viewInfo.name.toLowerCase();
  }
  public constructor(props: TProps) {
    super(props);
    this.viewState = props.viewState!;
    this.joinClass.bind(this);
  }
  public ref<T extends React.Component | { [key: string]: any }>(refName: string): T {
    return this.refs[refName] as T;
  }
  public updateViewState(): void {
    if (this.props.viewState && this.props.viewState.viewState) {
      this.setState(this.props.viewState.viewState);
    }
  }
  public componentDidMount() {
    super.componentDidMount();
    // update state before mount
    this.updateViewState();
  }
  public componentWillUnmount() {
    super.componentWillUnmount();
  }
  public componentWillReceiveProps(newProp: TProps) {
    this.updateViewState();
  }
  public abstract render(): React.ReactNode | JSX.Element | JSX.Element[];
}
export namespace View {
  export interface IState {
  }
  export interface IProps {
    instanceId?: string;
    visible?: boolean;
    viewState?: ViewState;
  }
  export interface IView<TProps extends IProps, TState extends IState> { }
  export interface IViewConstructor {
    require?: () => IIntent[];
    new(...args: any[]): View<any, any>;
  }
  export interface IViewMeasures {
    mobile?: IViewMeasure;
    tablet?: IViewMeasure;
    desktop?: IViewMeasure;
  }
  export interface IViewMeasure {
    width?: number | string;
    height?: number | string;
  }
}
export default View;
