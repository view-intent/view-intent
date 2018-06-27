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
var utility_collection_1 = require("utility-collection");
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        var _this = _super.call(this, props) || this;
        _this._loadingClassName = "preload";
        _this._unregisterObservables = [];
        _this._isMounted = false;
        _this.observe.bind(_this);
        return _this;
    }
    Object.defineProperty(Component.prototype, "loadingClassName", {
        get: function () {
            return this._loadingClassName;
        },
        // @observable public LoadingClassName: string = "preload";
        set: function (value) {
            if (this.loadingClassName !== value) {
                this.loadingClassName = value;
                this.forceUpdate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.notify = function () {
        this.forceUpdate();
    };
    Component.prototype.joinClass = function (classNames, loader) {
        if (loader === void 0) { loader = false; }
        if (typeof classNames === "string") {
            if (loader) {
                return this.joinClass([classNames]);
            }
            else {
                return this.joinClass([classNames, this.loadingClassName]);
            }
        }
        else {
            if (loader) {
                classNames.push(this.loadingClassName);
            }
            return utility_collection_1.Dom.joinClass(classNames);
        }
    };
    Object.defineProperty(Component.prototype, "isMounted", {
        get: function () {
            return this._isMounted;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.observe = function (observableInstance) {
        this._unregisterObservables.push(observableInstance.subscribe(this));
    };
    Component.prototype.componentDidMount = function () {
        this._isMounted = true;
    };
    Component.prototype.componentWillUnmount = function () {
        this._isMounted = false;
        while (this._unregisterObservables.length > 0) {
            this._unregisterObservables.pop()();
        }
    };
    return Component;
}(React.Component));
exports.Component = Component;
exports.default = Component;
//# sourceMappingURL=component.js.map