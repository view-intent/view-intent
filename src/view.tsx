import * as React from "react";
import * as ReactDOM from "react-dom";
import { observe, IObjectChange } from "mobx";
import { IIntent } from "./main-types";
import { ViewIntentState } from "./view-intent-state";

const equal: (value1: any, value2: any) => boolean = require("deep-equal");

// observe( (change)=>{  });

export abstract class View<TProps extends View.IProps<TStore>, TState extends View.IState, TStore> extends React.Component<TProps, TState> implements View.IView<TProps, TState, TStore>  {
	public abstract state: TState;
	private mobxInstances: Array<(change: IObjectChange) => void> = [];
	private mobxUnregiters: Array<() => void> = [];
	public constructor(props: TProps) {
		super(props);
	}
	public bindStore(instance: any) {
		this.mobxInstances.push(instance);
	}
	public inject(state: any): void {
		this.setState(state);
	}
	public componentWillMount(): void {
		const self = this;
		this.mobxInstances.forEach((instance) => {
			this.mobxUnregiters.push(observe(instance, (change) => {
				if (!equal(change.oldValue, change.newValue)) {
					self.forceUpdate();
				}
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
	export interface IProps<TStore> {
		store?: TStore;
		instanceId?: string;
		visible?: boolean;
	}
	export interface IView<TProps extends IProps<TStore>, TState extends IState, TStore> {

	}
	export interface IViewConstructor {
		require?: () => IIntent[];
		// new(props: any): View<any, any, any>;
		new(...args: any[]): View<any, any, any>;
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
