import * as React from "react";
import { IObserver, Observable } from "abstract-observable";
import { Dom } from "utility-collection";
import { IIntent } from "./types";
import { intentView as intentViewImport } from "./intent-view";
interface IObserverData {
  lastIndex: number;
  observers: {
    [index: number]: {
      index: number;
      notify: (() => void) | IObserver;
    };
  };
  notifying: boolean;
}
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
  public get isLoading() {
    return this._loading;
  }
  private _loading: boolean = false;
  private _loadingClassName: string = "preload";
  private _unregisterObservables: Array<() => void> = [];
  private _isMounted: boolean = false;
  private _observable: IObserverData = {
    lastIndex: 0,
    notifying: false,
    observers: {},
  };
  constructor(props: IProps) {
    super(props);
    this.observe = this.observe.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.notify = this.notify.bind(this);
    this.notifyAllObservers = this.notifyAllObservers.bind(this);
  }
  public subscribe(observer: (() => void) | IObserver): () => void {
    const currentIndex = this._observable.lastIndex++;
    this._observable.observers[currentIndex] = {
      index: currentIndex,
      notify: observer,
    };
    // * return unsubscribe method
    return () => {
      delete this._observable.observers[currentIndex];
    };
  }
  public loading(): void {
    this._loading = true;
    this.notify();
  }
  public loaded(): void {
    this._loading = false;
    this.notify();
  }
  public notify(): void {
    if (!this._observable.notifying) {
      this._observable.notifying = true;
      this.notifyAllObservers(); // * should this be immediate?
    }
    if (this._isMounted) {
      this.forceUpdate();
    }
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

  private notifyAllObservers(): void {
    for (const i in this._observable.observers) {
      if (this._observable.observers.hasOwnProperty(i)) {
        const holder = this._observable.observers[i];
        if (typeof holder.notify === "object") {
          if (holder.notify.notify !== undefined) {
            holder.notify.notify();
          }
        } else {
          holder.notify();
        }
      }
    }
    this._observable.notifying = false;
  }
}
export default Component;
