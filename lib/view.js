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
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(props) {
        var _this = _super.call(this, props) || this;
        _this.observables = [];
        return _this;
    }
    View.prototype.inject = function (state) {
        // const newState: TState = Object.assign(this.state, state);
        // this.setState(newState);
        // const newState: TState = Object.assign(this.state, state);
        this.setState(state);
    };
    View.prototype.componentDidMount = function () {
        // console.log("name: " + this.constructor.name);
        // ViewIntentState.Instance.viewComponentDidMount(this);
    };
    View.prototype.componentWillUnmount = function () {
        // console.log("name: " + this.constructor.name);
        // ViewIntentState.Instance.viewComponentWillUnmount(this);
    };
    return View;
}(React.Component));
export { View };
export default View;
//# sourceMappingURL=view.js.map