import * as React from "react";
import { IObserver, Observable } from "abstract-observable";
import { Dom } from "utility-collection";
import { IIntent } from "./types";
import { intentView as intentViewImport } from "./intent-view";

export abstract class Component<IProps, IState> extends React.Component<IProps, IState> implements IObserver {
  // @observable public LoadingClassName: string = "preload";
  public set loadingClassName(value: string) {
    if (this.loadingClassName !== value) {
      this.loadingClassName = value;
      this.forceUpdate();
    }
  }
  public get loadingClassName() {
    return this._loadingClassName;
  }
  private _loadingClassName: string = "preload";
  private _unregisterObservables: Array<() => void> = [];
  private _isMounted: boolean = false;
  constructor(props: IProps) {
    super(props);
    this.observe.bind(this);
  }
  public notify(): void {
    this.forceUpdate();
  }
  public intentView(intent: IIntent, viewState?: any, callback?: ((data: any) => void) | null): (event: any) => void;
  public intentView(url: string, viewState?: any, callback?: ((data: any) => void) | null): (event: any) => void;
  public intentView(intentOrUrl: IIntent | string, viewState: any = null, callback: ((data: any) => void) | null = null): (event: any) => void {
    return (event: any) => {
      intentViewImport(intentOrUrl as any, viewState as any, callback as any);
    };
  }
  public joinClass(classNames: Array<string | undefined | null> | string, loader: boolean = false): string {
    if (typeof classNames === "string") {
      if (loader) {
        return this.joinClass([classNames]);
      } else {
        return this.joinClass([classNames, this.loadingClassName]);
      }
    } else {
      if (loader) {
        classNames.push(this.loadingClassName);
      }
      return Dom.joinClass(classNames);
    }
  }
  public get isMounted() {
    return this._isMounted;
  }
  public observe(observableInstance: Observable) {
    this._unregisterObservables.push(observableInstance.subscribe(this));
  }
  public componentDidMount(): void {
    this._isMounted = true;
  }
  public componentWillUnmount() {
    this._isMounted = false;
    while (this._unregisterObservables.length > 0) {
      this._unregisterObservables.pop()!();
    }
  }
  public abstract render(): React.ReactNode;
}
export default Component;
