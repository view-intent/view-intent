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
import { Component } from "./component";
var DefaultLoader = /** @class */ (function (_super) {
    __extends(DefaultLoader, _super);
    function DefaultLoader(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    DefaultLoader.prototype.render = function () {
        return React.createElement("div", null, "loading");
    };
    return DefaultLoader;
}(Component));
export { DefaultLoader };
export default DefaultLoader;
//# sourceMappingURL=default-loader.js.map