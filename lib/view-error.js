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
var view_1 = require("./view");
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
        return React.createElement("div", { className: "view-not-found rows rh-12 rw-12" },
            React.createElement("div", null, "View Not Found"));
    };
    return ViewNotFound;
}(view_1.View));
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
//# sourceMappingURL=view-error.js.map