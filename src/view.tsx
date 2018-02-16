import * as React from "react";
import * as ReactDOM from "react-dom";
import { observe, IObjectChange } from "mobx";
import { IIntent, IViewInfo } from "./types";
import { ViewIntentState } from "./view-intent-state";

const equal: (value1: any, value2: any) => boolean = require("deep-equal");

export abstract class View<TProps extends View.IProps, TState extends View.IState> extends React.Component<TProps, TState> implements View.IView<TProps, TState>  {
	public abstract viewInfo: IViewInfo;
	public abstract state: TState;
	public get viewClassName() {
		return this.viewInfo.area.toLowerCase() + "-" + this.viewInfo.name.toLowerCase();
	}
	private mobxInstances: Array<(change: IObjectChange) => void> = [];
	private mobxUnregiters: Array<() => void> = [];
	public constructor(props: TProps) {
		super(props);
		// this.bindStore.bind(this);
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
				// if (!equal(change.oldValue, change.newValue)) {
				// }
			}));
		});
	}
	public componentWillUnmount(): void {
		while (this.mobxUnregiters.length > 0) {
			this.mobxUnregiters.pop()();
		}
	}
	public abstract render(): JSX.Element;
}
export namespace View {
	export interface IState {
	}
	export interface IProps {
		// store?: TStore;
		instanceId?: string;
		visible?: boolean;
	}
	export interface IView<TProps extends IProps, TState extends IState> {

	}
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
