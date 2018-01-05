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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observer } from "mobx-react";
import * as React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { ViewIntentState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
import "./view-frame.scss";
import "./view-frame-transitions.scss";
var ViewFrame = /** @class */ (function (_super) {
    __extends(ViewFrame, _super);
    function ViewFrame(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isRoot: _this.props.root,
            id: _this.props.id,
        };
        if (_this.state.isRoot === true) {
            _this.state.id = "root";
            ViewFrame_1.rootDefined = true;
        }
        else if (_this.state.id === undefined || _this.state.id === undefined) {
            throw new Error("View Frame must have an id.");
        }
        else if (_this.state.id.toLowerCase() === "root") {
            _this.state.isRoot = true;
            ViewFrame_1.rootDefined = true;
        }
        if (ViewFrame_1.rootDefined === false) {
            throw new Error("The root \"ViewFrame\" wasn't defined.");
        }
        return _this;
    }
    ViewFrame_1 = ViewFrame;
    ViewFrame.prototype.renderViewList = function () {
        return ViewIntentState.Instance.getViewStateListByFrameId(this.state.id).map(function (viewState, index) {
            // console.log("visible", viewState, viewState.isVisible);
            var ViewRenderComponent;
            ViewRenderComponent = ViewTypeStore.getViewType(viewState.areaName, viewState.viewType);
            return (viewState.isVisible ? React.createElement(ViewRenderComponent, { key: viewState.instanceId }) : null);
        });
    };
    ViewFrame.prototype.render = function () {
        var stack = this.props.stack;
        var flexClassName = "";
        if (stack === undefined || stack === null) {
            stack = "x";
        }
        if (stack === "x" || stack === "y") {
            flexClassName = "view-intent-frame-flex";
        }
        return React.createElement(ReactCSSTransitionGroup, { transitionName: stack, transitionAppear: true, transitionLeave: false, transitionEnter: true, component: "div", className: (this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame", transitionEnterTimeout: 300, transitionLeaveTimeout: 300, transitionAppearTimeout: 300 }, this.renderViewList());
    };
    ViewFrame = ViewFrame_1 = __decorate([
        observer,
        __metadata("design:paramtypes", [Object])
    ], ViewFrame);
    return ViewFrame;
    var ViewFrame_1;
}(React.Component));
export { ViewFrame };
(function (ViewFrame) {
    ViewFrame.rootDefined = false;
})(ViewFrame || (ViewFrame = {}));
export default ViewFrame;
//# sourceMappingURL=view-frame.js.map