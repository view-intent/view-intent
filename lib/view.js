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
import Component from "./component";
// const equal: (value1: any, value2: any) => boolean = require("deep-equal");
// export abstract class View<TProps extends View.IProps, TState extends View.IState> extends React.Component<TProps, TState> implements View.IView<TProps, TState>  {
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(props) {
        var _this = _super.call(this, props) || this;
        _this.viewState = null;
        _this.viewState = props.viewState;
        _this.joinClass.bind(_this);
        return _this;
    }
    Object.defineProperty(View.prototype, "viewClassName", {
        get: function () {
            return this.viewInfo.area.toLowerCase() + "-" + this.viewInfo.name.toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.ref = function (refName) {
        return this.refs[refName];
    };
    View.prototype.updateViewState = function () {
        if (this.props.viewState && this.props.viewState.viewState) {
            this.setState(this.props.viewState.viewState);
        }
    };
    View.prototype.componentDidMount = function () {
        // super.componentWillMount(); // TODO: must review this
        // update state before mount
        this.updateViewState();
    };
    View.prototype.componentWillReceiveProps = function (newProp) {
        this.updateViewState();
    };
    return View;
}(Component));
export { View };
export default View;
//# sourceMappingURL=view.js.map