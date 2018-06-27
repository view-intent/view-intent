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
var field_1 = require("../field/field");
var main_1 = require("../../../view-intent/main");
// import "./.scss";
var uniqid_1 = require("uniqid");
require("./selectbox-modal");
// const loadCss = require("load-css-file");
// // loadCss("D:\\dan2dev\\view-intent\\src\\ui\\form\\selectbox\\selectbox.css");
var Selectbox = /** @class */ (function (_super) {
    __extends(Selectbox, _super);
    function Selectbox(props) {
        var _this = _super.call(this, props) || this;
        _this.buttonRef = React.createRef();
        _this.uniqueId = uniqid_1.process();
        _this.state = {};
        _this.viewResponse.bind(_this);
        console.log("uniqueId: " + _this.uniqueId);
        return _this;
    }
    Selectbox.prototype.viewResponse = function (data) {
        console.log("response - ", data);
    };
    Selectbox.prototype.render = function () {
        var _this = this;
        return React.createElement(field_1.default, { type: "selectbox", className: "viui-selectbox" },
            React.createElement("div", { ref: this.buttonRef, onClick: function () {
                    main_1.default.intentView({ areaName: "viui", viewType: "SelectboxModal", instanceId: _this.uniqueId }, {}, _this.viewResponse);
                } },
                React.createElement("span", null,
                    "\\/ ---xx ",
                    this.uniqueId)));
    };
    return Selectbox;
}(React.Component));
exports.Selectbox = Selectbox;
exports.default = Selectbox;
//# sourceMappingURL=selectbox.js.map