// // import { observer } from "mobx-react";
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { View, ViewIntent, IViewInfo } from "./main";
// // import "./.scss";

// // @observer
// export class ViewNotFound extends View<ViewNotFound.IProps, ViewNotFound.IState> {
// 	public viewInfo = ViewNotFound.viewInfo;
// 	public state: ViewNotFound.IState = {
// 	};
// 	constructor(props: ViewNotFound.IProps) {
// 		super(props);
// 	}
// 	public render(): JSX.Element {
// 		return <div className="cols h-100p w-100p text-center not-found-view">
// 			<div className="gw-4">View not found</div>
// 		</div>;
// 	}
// }
// export namespace ViewNotFound {
// 	export const viewInfo: IViewInfo = {
// 		area: "default",
// 		name: "ViewNotFound",
// 		type: ViewNotFound,
// 	};
// 	export interface IProps extends View.IProps {

// 	}
// 	export interface IState extends View.IState {
// 	}
// }

import * as React from "react";
import * as ReactDOM from "react-dom";
import { View, ViewIntent, IViewInfo } from "./main";

// import { View, ViewIntent, IViewInfo } from "view-intent";
// import { RootStore } from "tonolucro-delivery-state";
// import "./none.scss";

export class ViewNotFound extends View<ViewNotFound.IProps, ViewNotFound.IState> {
	public viewInfo = ViewNotFound.viewInfo;
	public state: ViewNotFound.IState = {
	};
	constructor(props: ViewNotFound.IProps) {
		super(props);
		// this.bindStore(putRootStoreInstanceHere);
	}
	public render(): JSX.Element {
		return <div className={this.viewClassName}>View Not Found</div>;
	}
}
export namespace ViewNotFound {
	export const viewInfo: IViewInfo = {
	   area: "default",
	   name: "ViewNotFound",
	   type: ViewNotFound,
	   frameId: "root",
	   require: [],
	};
	export interface IProps extends View.IProps {
	}
	export interface IState extends View.IState {
	}
}
// ViewIntent.registerViewType(ViewNotFound.viewInfo);
