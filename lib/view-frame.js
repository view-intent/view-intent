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
// import { observer } from "mobx-react";
import * as React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { ViewIntentState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
import "./view-frame.scss";
import "./view-frame-transitions.scss";
import { observe } from "mobx";
// @observer
var ViewFrame = /** @class */ (function (_super) {
    __extends(ViewFrame, _super);
    function ViewFrame(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isRoot: _this.props.root,
            id: _this.props.id,
        };
        _this.unobserve = null;
        if (_this.state.isRoot === true) {
            _this.state.id = "root";
            ViewFrame.rootDefined = true;
        }
        else if (_this.state.id === undefined || _this.state.id === undefined) {
            throw new Error("View Frame must have an id.");
        }
        else if (_this.state.id.toLowerCase() === "root") {
            _this.state.isRoot = true;
            ViewFrame.rootDefined = true;
        }
        if (ViewFrame.rootDefined === false) {
            throw new Error("The root \"ViewFrame\" wasn't defined.");
        }
        return _this;
    }
    ViewFrame.prototype.componentWillMount = function () {
        var _this = this;
        this.unobserve = observe(ViewIntentState.Instance, function (change) {
            if (change.oldValue !== change.newValue) {
                _this.forceUpdate();
            }
        });
    };
    ViewFrame.prototype.componentWillUnmount = function () {
        this.unobserve();
    };
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
    return ViewFrame;
}(React.Component));
export { ViewFrame };
(function (ViewFrame) {
    ViewFrame.rootDefined = false;
})(ViewFrame || (ViewFrame = {}));
export default ViewFrame;
//# sourceMappingURL=view-frame.js.map