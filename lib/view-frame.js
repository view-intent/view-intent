"use strict";
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
var React = require("react");
var react_addons_css_transition_group_1 = require("react-addons-css-transition-group");
var view_intent_state_1 = require("./view-intent-state");
var view_type_store_1 = require("./view-type-store");
// import "./view-frame.scss";
// import "./view-frame-transitions.scss";
var mobx_1 = require("mobx");
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
        this.unobserve = mobx_1.observe(view_intent_state_1.ViewIntentState.Instance, function (change) {
            _this.forceUpdate();
        });
    };
    ViewFrame.prototype.componentWillUnmount = function () {
        this.unobserve();
    };
    ViewFrame.prototype.renderViewList = function () {
        return view_intent_state_1.ViewIntentState.Instance.getViewStateListByFrameId(this.state.id).map(function (viewState, index) {
            var ViewRenderComponent;
            ViewRenderComponent = view_type_store_1.ViewTypeStore.getViewType(viewState.areaName, viewState.viewType);
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
        return React.createElement(react_addons_css_transition_group_1.default, { transitionName: stack, transitionAppear: true, transitionLeave: false, transitionEnter: true, component: "div", id: this.props.id, className: (this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame", transitionEnterTimeout: 300, transitionLeaveTimeout: 300, transitionAppearTimeout: 300 }, this.renderViewList());
    };
    return ViewFrame;
}(React.Component));
exports.ViewFrame = ViewFrame;
(function (ViewFrame) {
    ViewFrame.rootDefined = false;
})(ViewFrame = exports.ViewFrame || (exports.ViewFrame = {}));
exports.ViewFrame = ViewFrame;
exports.default = ViewFrame;
//# sourceMappingURL=view-frame.js.map