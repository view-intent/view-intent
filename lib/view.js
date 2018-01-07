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
import { observe } from "mobx";
var equal = require("deep-equal");
// observe( (change)=>{  });
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(props) {
        var _this = _super.call(this, props) || this;
        _this.mobxInstances = [];
        _this.mobxUnregiters = [];
        return _this;
    }
    View.prototype.bindStore = function (instance) {
        this.mobxInstances.push(instance);
    };
    // public inject(state: any): void {
    // 	this.setState(state);
    // }
    View.prototype.componentWillMount = function () {
        var _this = this;
        var self = this;
        this.mobxInstances.forEach(function (instance) {
            _this.mobxUnregiters.push(observe(instance, function (change) {
                if (!equal(change.oldValue, change.newValue)) {
                    _this.forceUpdate();
                }
            }));
        });
    };
    View.prototype.componentWillUnmount = function () {
        while (this.mobxUnregiters.length > 0) {
            this.mobxUnregiters.pop()();
        }
    };
    return View;
}(React.Component));
export { View };
export default View;
//# sourceMappingURL=view.js.map