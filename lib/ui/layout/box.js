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
// import "./box.css";
// import "./box.scss";
// require("loadcss")("http://localhost:5110/dan2dev/view-intent/src/ui/layout/box.scss");
// console.log("testing");
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Box.prototype.render = function () {
        return React.createElement("div", { className: "viui-box" },
            React.createElement("div", { className: "viui-box__title" }, this.props.title),
            React.createElement("div", { className: "viui-box__body" }, this.props.children));
    };
    return Box;
}(React.Component));
exports.Box = Box;
exports.default = Box;
console.log("box lodaded");
//# sourceMappingURL=box.js.map