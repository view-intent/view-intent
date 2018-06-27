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
var defaults_1 = require("./defaults");
function style(size) {
    if (size === void 0) { size = "32px"; }
    return {
        width: size,
        height: size,
    };
}
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.render = function () {
        var _this = this;
        var computedStyle = style(this.props.size);
        return React.createElement("span", { className: "viui-icon " + (this.props.className || ""), style: computedStyle }, function () {
            if (_this.props.src === undefined || _this.props.src === null) {
                return React.createElement("span", { className: "viui-icon-core", style: computedStyle },
                    React.createElement(defaults_1.CircleIcon, null));
            }
            else if (typeof _this.props.src === "string") {
                return React.createElement("span", { className: "viui-icon-core" },
                    React.createElement("img", { src: _this.props.src, style: computedStyle }));
            }
            else {
                var Src = _this.props.src;
                return React.createElement("span", { className: "viui-icon-core", style: computedStyle },
                    React.createElement(Src, null));
            }
        });
    };
    return Icon;
}(React.Component));
exports.Icon = Icon;
exports.default = Icon;
//# sourceMappingURL=icon.js.map