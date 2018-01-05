import * as React from "react";
import * as ReactDOM from "react-dom";
import { IIntent } from "./main-types";
import { ViewIntentState } from "./view-intent-state";

export abstract class View<TProps extends View.IProps<TStore>, TState extends View.IState, TStore> extends React.Component<TProps, TState> implements View.IView<TProps, TState, TStore>  {
	public abstract state: TState;
	public observables: { [typeName: string]: any } = [];
	public constructor(props: TProps) {
		super(props);
	}
	public inject(state: any): void {
		// const newState: TState = Object.assign(this.state, state);
		// this.setState(newState);
		// const newState: TState = Object.assign(this.state, state);
		this.setState(state);
	}
	public componentDidMount(): void {
		// console.log("name: " + this.constructor.name);
		// ViewIntentState.Instance.viewComponentDidMount(this);
	}
	public componentWillUnmount(): void {
		// console.log("name: " + this.constructor.name);
		// ViewIntentState.Instance.viewComponentWillUnmount(this);
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
		inject: (newState: TState) => void;
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
