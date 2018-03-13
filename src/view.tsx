import * as React from "react";
import * as ReactDOM from "react-dom";
import { observe, IObjectChange } from "mobx";
import { IIntent, IViewInfo, INavState } from "./types";
import { ViewIntentState, ViewState } from "./view-intent-state";
import { Reflection } from "utility-collection";

const equal: (value1: any, value2: any) => boolean = require("deep-equal");

export abstract class View<TProps extends View.IProps, TState extends View.IState> extends React.Component<TProps, TState> implements View.IView<TProps, TState>  {
	public abstract viewInfo: IViewInfo;
	public abstract state: TState;
	public get viewClassName() {
		return this.viewInfo.area.toLowerCase() + "-" + this.viewInfo.name.toLowerCase();
	}
	public viewState: ViewState | null = null;
	private mobxInstances: Array<(change: IObjectChange) => void> = [];
	private mobxUnregiters: Array<() => void> = [];
	public constructor(props: TProps) {
		super(props);
		this.viewState = props.viewState!;
		// this.bindStore.bind(this);
		// this!.state = props.viewState!.viewState;
	}
	public ref<T extends React.Component | {[key: string]: any}>(refName: string): T {
		return this.refs[refName] as T;
	}
	public bindStore(instance: any) {
		this.mobxInstances.push(instance);
		// this.mobxInstances[this.mobxInstances.length - 1].bind(this.mobxInstances[this.mobxInstances.length - 1]);
	}
	// public inject(state: any): void {
	// 	this.setState(state);
	// }
	public componentWillMount(): void {
		const self = this;
		self.mobxInstances.forEach((instance) => {
			self.mobxUnregiters.push(observe(instance, (change) => {
				self.forceUpdate();
			}));
		});
		// update state before mount
		this.updateViewState();
	}
	public updateViewState(): void {
		if (this.props.viewState && this.props.viewState.viewState) {
			this.setState(this.props.viewState.viewState);
		}
	}
	public componentWillReceiveProps(newProp: TProps) {
		this.updateViewState();
	}
	public componentWillUnmount(): void {
		while (this.mobxUnregiters.length > 0) {
			this.mobxUnregiters.pop()!();
		}
	}
	public abstract render(): React.ReactNode | JSX.Element | JSX.Element[];
}
export namespace View {
	export interface IState {
	}
	export interface IProps {
		// store?: TStore;
		instanceId?: string;
		visible?: boolean;
		// navState?: INavState;
		viewState?: ViewState ;
	}
	export interface IView<TProps extends IProps, TState extends IState> {}
	export interface IViewConstructor {
		require?: () => IIntent[];
		// new(props: any): View<any, any, any>;
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
