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
import * as React from "react";
import { ViewIntentState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
var ViewFrame = /** @class */ (function (_super) {
    __extends(ViewFrame, _super);
    function ViewFrame(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isRoot: _this.props.root,
            id: _this.props.id,
        };
        _this.mounted = false;
        _this.unobserve = null;
        if (_this.state.isRoot === true) {
            _this.state.id = "root";
            ViewFrame.rootDefined = true;
        }
        else if (_this.state.id === undefined || _this.state.id === null) {
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
    ViewFrame.prototype.notify = function () {
        this.forceUpdate();
        // TODO: implements shouldComponentUpdate()
    };
    ViewFrame.prototype.componentWillMount = function () {
        this.unobserve = ViewIntentState.Instance.subscribe(this);
    };
    ViewFrame.prototype.componentDidMount = function () {
        this.mounted = true;
    };
    ViewFrame.prototype.componentWillUnmount = function () {
        this.unobserve();
        this.mounted = false;
    };
    ViewFrame.prototype.renderViewList = function () {
        var stateId = this.state.id;
        var r = ViewIntentState.Instance.getViewStateListByFrameId(stateId)
            .map(function (viewState, index) {
            var ViewRenderComponent;
            ViewRenderComponent = ViewTypeStore.getViewType(viewState.areaName, viewState.viewType);
            if (viewState.visible) {
                return React.createElement(ViewRenderComponent, { viewState: viewState, key: viewState.getViewInstanceAddress() });
            }
        });
        if (r !== undefined) {
            return r;
        }
        else {
            return [];
        }
    };
    ViewFrame.prototype.render = function () {
        return React.createElement("div", { key: this.props.id, id: this.props.id, style: this.props.style, className: (this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame" }, this.renderViewList());
    };
    return ViewFrame;
}(React.Component));
export { ViewFrame };
(function (ViewFrame) {
    ViewFrame.rootDefined = false;
})(ViewFrame || (ViewFrame = {}));
export default ViewFrame;
//# sourceMappingURL=view-frame.js.map