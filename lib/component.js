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
import { Dom } from "utility-collection";
import { intentView as intentViewImport } from "./intent-view";
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(props) {
        var _this = _super.call(this, props) || this;
        _this._loading = false;
        _this._loadingClassName = "preload";
        _this._unregisterObservables = [];
        _this._isMounted = false;
        _this._observable = {
            lastIndex: 0,
            notifying: false,
            observers: {},
        };
        _this.observe = _this.observe.bind(_this);
        _this.subscribe = _this.subscribe.bind(_this);
        _this.notify = _this.notify.bind(_this);
        _this.notifyAllObservers = _this.notifyAllObservers.bind(_this);
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
    Object.defineProperty(Component.prototype, "isLoading", {
        get: function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.subscribe = function (observer) {
        var _this = this;
        var currentIndex = this._observable.lastIndex++;
        this._observable.observers[currentIndex] = {
            index: currentIndex,
            notify: observer,
        };
        // * return unsubscribe method
        return function () {
            delete _this._observable.observers[currentIndex];
        };
    };
    Component.prototype.loading = function () {
        this._loading = true;
        this.notify();
    };
    Component.prototype.loaded = function () {
        this._loading = false;
        this.notify();
    };
    Component.prototype.notify = function () {
        if (!this._observable.notifying) {
            this._observable.notifying = true;
            this.notifyAllObservers(); // * should this be immediate?
        }
        if (this._isMounted) {
            this.forceUpdate();
        }
    };
    Component.prototype.intentView = function (intentOrUrl, viewState, callback) {
        if (viewState === void 0) { viewState = null; }
        if (callback === void 0) { callback = null; }
        return function (event) {
            intentViewImport(intentOrUrl, viewState, callback);
        };
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
            return Dom.joinClass(classNames);
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
    Component.prototype.notifyAllObservers = function () {
        for (var i in this._observable.observers) {
            if (this._observable.observers.hasOwnProperty(i)) {
                var holder = this._observable.observers[i];
                if (typeof holder.notify === "object") {
                    if (holder.notify.notify !== undefined) {
                        holder.notify.notify();
                    }
                }
                else {
                    holder.notify();
                }
            }
        }
        this._observable.notifying = false;
    };
    return Component;
}(React.Component));
export { Component };
export default Component;
//# sourceMappingURL=component.js.map