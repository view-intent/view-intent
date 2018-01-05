// import { observer } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { View, ViewIntent } from "./main";
// import "./.scss";

// @observer
export class ViewNotFound extends View<ViewNotFound.IProps, ViewNotFound.IState, any> {
	public state: ViewNotFound.IState = {
	};
	constructor(props: ViewNotFound.IProps) {
		super(props);
	}
	public render(): JSX.Element {
		return <div className="cols h-100p w-100p not-found-view">
			<div className="gw-4">View not found</div>
		</div>;
	}
}
export namespace ViewNotFound {
	export interface IProps extends View.IProps<any> {

	}
	export interface IState extends View.IState {
	}
}
