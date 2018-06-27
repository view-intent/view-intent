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
var box_1 = require("./box");
// import "./.scss";
var ViewBox = /** @class */ (function (_super) {
    __extends(ViewBox, _super);
    function ViewBox(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.renderTitle.bind(_this);
        return _this;
    }
    ViewBox.prototype.renderTitle = function () {
        return [
            React.createElement("div", { className: "-title-name" }, this.props.title),
            React.createElement("div", { className: "-title-action" }),
        ];
    };
    ViewBox.prototype.render = function () {
        return React.createElement(box_1.Box, { title: this.props.title }, this.props.children);
    };
    return ViewBox;
}(React.Component));
exports.ViewBox = ViewBox;
exports.default = ViewBox;
//# sourceMappingURL=view-box.js.map