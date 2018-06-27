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
var main_1 = require("../../view-intent/main");
// import "./.scss";
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        var _this = _super.call(this, props) || this;
        _this.viewInfo = Modal.viewInfo;
        _this.state = {};
        return _this;
        // this.bindStore(putRootStoreInstanceHere);
    }
    Modal.prototype.render = function () {
        return React.createElement("div", { className: " " + this.props.className }, "global.Modal");
    };
    return Modal;
}(main_1.View));
exports.Modal = Modal;
(function (Modal) {
    Modal.viewInfo = {
        area: "global",
        name: "Modal",
        type: Modal,
        frameId: "root",
        require: [],
    };
})(Modal = exports.Modal || (exports.Modal = {}));
exports.Modal = Modal;
main_1.ViewIntent.registerViewType(Modal.viewInfo);
//# sourceMappingURL=modal.js.map