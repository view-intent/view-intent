"use strict";
// // import { observer } from "mobx-react";
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { View, ViewIntent, IViewInfo } from "./main";
// // import "./.scss";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
var React = require("react");
var main_1 = require("./main");
// import { View, ViewIntent, IViewInfo } from "view-intent";
// import { RootStore } from "tonolucro-delivery-state";
// import "./none.scss";
var ViewNotFound = /** @class */ (function (_super) {
    __extends(ViewNotFound, _super);
    function ViewNotFound(props) {
        var _this = _super.call(this, props) || this;
        _this.viewInfo = ViewNotFound.viewInfo;
        _this.state = {};
        return _this;
        // this.bindStore(putRootStoreInstanceHere);
    }
    ViewNotFound.prototype.render = function () {
        return React.createElement("div", { className: this.viewClassName }, "View Not Found");
    };
    return ViewNotFound;
}(main_1.View));
exports.ViewNotFound = ViewNotFound;
(function (ViewNotFound) {
    ViewNotFound.viewInfo = {
        area: "default",
        name: "ViewNotFound",
        type: ViewNotFound,
        frameId: "root",
        require: [],
    };
})(ViewNotFound = exports.ViewNotFound || (exports.ViewNotFound = {}));
exports.ViewNotFound = ViewNotFound;
// ViewIntent.registerViewType(ViewNotFound.viewInfo);
//# sourceMappingURL=view-error.js.map