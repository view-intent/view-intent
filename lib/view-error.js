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
import { View } from "./main";
// import "./.scss";
// @observer
var ViewNotFound = /** @class */ (function (_super) {
    __extends(ViewNotFound, _super);
    function ViewNotFound(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ViewNotFound.prototype.render = function () {
        return React.createElement("div", { className: "cols h-100p w-100p not-found-view" },
            React.createElement("div", { className: "gw-4" }, "View not found"));
    };
    return ViewNotFound;
}(View));
export { ViewNotFound };
//# sourceMappingURL=view-error.js.map