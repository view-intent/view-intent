import * as React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as ReactDOM from "react-dom";
import { View } from "./view";
import { ViewIntentState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
// import "./view-frame.scss";
// import "./view-frame-transitions.scss";
import { observe } from "mobx";

export class ViewFrame extends React.Component<ViewFrame.IProps, ViewFrame.IState> {
	public state: ViewFrame.IState = {
		isRoot: this.props.root,
		id: this.props.id,
	};
	private unobserve: () => void = null;
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
		this.unobserve();
	}
	public renderViewList(): JSX.Element[] {
		return ViewIntentState.Instance.getViewStateListByFrameId(this.state.id).map((viewState, index) => {

			let ViewRenderComponent: View.IViewConstructor | null | any;
			ViewRenderComponent = ViewTypeStore.getViewType(viewState.areaName, viewState.viewType);
			return (viewState.isVisible ? <ViewRenderComponent key={viewState.instanceId} /> : null);
		});
	}
	public render(): JSX.Element {
		return <div
			id={this.props.id}
			className={(this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame"}>
				{this.renderViewList()}
			</div>;
		// return <ReactCSSTransitionGroup
		// 		transitionName="view-intent"
		// 		transitionAppear={true}
		// 		transitionLeave={false}
		// 		transitionEnter={true}
		// 		component="div"
		// 		id={this.props.id}
		// 		className={(this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame"}
		// 		transitionEnterTimeout={300}
		// 		transitionAppearTimeout={300}>
		// 		{this.renderViewList()}
		// 	</ReactCSSTransitionGroup>;
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
export default ViewFrame;
