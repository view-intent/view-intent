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
// import { action, observable } from "../mobx/main"; // "view-intent-mobx";
import { process } from "uniqid";
import { ViewTypeStore } from "./view-type-store";
import { Helper } from "./helper";
import { Is } from "utility-collection";
import { WindowHistoryHelper } from "./window-history-helper";
import { Observable } from "abstract-observable";
var ViewState = /** @class */ (function (_super) {
    __extends(ViewState, _super);
    function ViewState(intent, root) {
        var _this = _super.call(this, root) || this;
        _this.require = null;
        // ------------
        _this.visible = false;
        _this.viewState = {};
        _this.store = ViewIntentState.Instance;
        // @observable public visible: boolean = false;
        // @observable public viewState: any | null = {};
        // @observable public store = ViewIntentState.Instance;
        _this.stateInstance = ViewIntentState.Instance;
        _this.root = root;
        _this.viewType = intent.viewType;
        _this.areaName = intent.areaName;
        if (Is.empty(intent.instanceId) || intent.instanceId === "new" || intent.instanceId === "last") {
            _this.instanceId = process();
        }
        else {
            _this.instanceId = intent.instanceId.toString();
        }
        _this.viewState = intent.viewState;
        _this.viewTypeInfo = ViewTypeStore.getViewTypeInfo(_this.areaName, _this.viewType);
        if (_this.viewTypeInfo === undefined) {
            throw new Error("The View \"" + _this.areaName + "." + _this.viewType + "\"  wasn't registered.");
        }
        else {
            _this.frameId = _this.viewTypeInfo.frameId;
        }
        return _this;
    }
    Object.defineProperty(ViewState.prototype, "storeName", {
        get: function () {
            return this.areaName.toLowerCase() + "." + this.viewType.replace(new RegExp("-", "g"), "").toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    // @action public show(processRequires: boolean) {
    ViewState.prototype.show = function (processRequires) {
        var _this = this;
        if (!this.visible) {
            this.visible = true;
            if (this.require === null) {
                this.require = this.viewTypeInfo.require;
            }
            processRequires && this.require && this.require.forEach(function (requireItem) {
                if (requireItem !== "global.stack") {
                    var requireViewState = _this.stateInstance.getViewStateByIntent(requireItem);
                    requireViewState && requireViewState.show(true);
                }
            });
            this.root.notify();
        }
        this.notify();
    };
    // @action public hide() {
    ViewState.prototype.hide = function () {
        if (this.visible) {
            this.visible = false;
            this.root.notify();
        }
        this.notify();
    };
    ViewState.prototype.getViewInstanceAddress = function () {
        return (this.areaName + "." + this.viewType + ":" + this.instanceId).toLowerCase();
    };
    ViewState.prototype.setState = function (state) {
        if (state === void 0) { state = {}; }
        this.viewState = state;
        this.notify();
    };
    return ViewState;
}(Observable));
export { ViewState };
var ViewIntentState = /** @class */ (function (_super) {
    __extends(ViewIntentState, _super);
    function ViewIntentState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewStateList = [];
        // @observable public version: number = 0;
        _this.lastProcessed = "";
        return _this;
        // @action public notify() {
        //   this.version++;
        // }
    }
    Object.defineProperty(ViewIntentState, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    ViewIntentState.prototype.getViewStateListByFrameId = function (frameId) {
        if (frameId !== null && frameId !== undefined) {
            return this.viewStateList.filter(function (viewState, index) {
                if (viewState.frameId !== null && viewState.frameId !== undefined) {
                    return viewState.frameId.toLowerCase() === frameId.toLowerCase();
                }
                else {
                    return false;
                }
            });
        }
        else {
            return [];
        }
    };
    ViewIntentState.prototype.getLastViewStateByType = function (areaName, viewType) {
        if (viewType !== null && viewType !== undefined && areaName !== null && areaName !== undefined) {
            areaName = areaName.toLowerCase();
            viewType = viewType.toLowerCase();
            viewType = viewType.replace(/-/g, "");
        }
        else {
            throw new Error("The arguments \"AreaName\" and \"ViewType\" must be passed.");
        }
        var i = this.viewStateList.findIndex(function (viewState) {
            return viewState.viewType.toLowerCase() === viewType && viewState.areaName.toLowerCase() === areaName;
        });
        var r = this.viewStateList[i];
        if (i >= 0 && r !== undefined) {
            return r;
        }
        return null;
    };
    ViewIntentState.prototype.getViewStateById = function (intent, generate) {
        if (generate === void 0) { generate = false; }
        if (intent === null) {
            return null;
        }
        var r;
        if (!Is.empty(intent.instanceId)) {
            intent.instanceId = intent.instanceId && intent.instanceId.toLowerCase();
            intent.viewType = intent.viewType.toLowerCase();
            intent.areaName = intent.areaName.toLowerCase();
            r = this.viewStateList.find(function (viewState) {
                if (viewState.instanceId.toLowerCase() === intent.instanceId &&
                    viewState.viewType.toLowerCase() === intent.viewType &&
                    viewState.areaName.toLowerCase() === intent.areaName) {
                    return true;
                }
                else {
                    return false;
                }
            });
            if (r !== undefined) {
                return r;
            }
        }
        if (generate === true) {
            r = this.newViewInstance(intent, false);
            return r;
        }
        return null;
    };
    ViewIntentState.prototype.getViewStateByIntent = function (intent) {
        if (typeof intent === "string") {
            intent = Helper.pathToIntent(intent);
        }
        var returnView = null;
        if (intent.instanceId === undefined || intent.instanceId === null || intent.instanceId === "last") {
            // last
            returnView = this.getLastViewStateByType(intent.areaName, intent.viewType);
        }
        else if (intent.instanceId === "new") {
            // new 
            intent.instanceId = process();
            returnView = this.newViewInstance(intent, false);
        }
        else {
            // id
            returnView = this.getViewStateById(intent);
        }
        // new
        if (returnView === null || returnView === undefined) {
            returnView = this.newViewInstance(intent, false);
        }
        return returnView;
    };
    ViewIntentState.prototype.getVisibleViewState = function () {
        var r = this.viewStateList.filter(function (viewState) {
            return viewState.visible;
        });
        return r;
    };
    ViewIntentState.prototype.getVisibleViewStateAddresses = function () {
        var r = this.getVisibleViewState().map(function (ViewState) {
            return ViewState.getViewInstanceAddress();
        });
        return r;
    };
    // @action public newViewInstance(intent: IIntent, unshift: boolean = false): ViewState {
    ViewIntentState.prototype.newViewInstance = function (intent, unshift) {
        if (unshift === void 0) { unshift = false; }
        if (unshift) {
            this.viewStateList.unshift(new ViewState(intent, this));
            return this.viewStateList[0];
        }
        else {
            this.viewStateList.push(new ViewState(intent, this));
            var index = this.viewStateList.length - 1;
            return this.viewStateList[index];
        }
        this.notify();
    };
    ViewIntentState.prototype.hideAll = function () {
        this.viewStateList.forEach(function (viewState) {
            viewState.hide();
        });
        this.notify();
    };
    // @action public showViewStatesByAddresses(viewStateAddresses: string[]): void {
    ViewIntentState.prototype.showViewStatesByAddresses = function (viewStateAddresses) {
        this.viewStateList.forEach(function (viewState) {
            var viewStateAddress = viewState.getViewInstanceAddress();
            if (viewStateAddresses.indexOf(viewStateAddress) > -1) {
                viewState.show(false);
            }
            else {
                viewState.hide();
            }
        });
        this.notify();
    };
    ViewIntentState.prototype.processPopIntent = function (navState) {
        if (navState.visibleViewStates !== null) {
            this.showViewStatesByAddresses(navState.visibleViewStates);
        }
        this.notify();
    };
    ViewIntentState.prototype.processIntent = function (intent, url) {
        if (url === void 0) { url = null; }
        var currentView = this.getViewStateByIntent(intent);
        if (currentView) {
            if (currentView.viewTypeInfo.require.indexOf("global.stack") === -1) {
                this.hideAll();
            }
            currentView && currentView.show(true);
        }
        WindowHistoryHelper.setCurrentStateViewAddresses(this.getVisibleViewStateAddresses());
        this.notify();
    };
    return ViewIntentState;
}(Observable));
export { ViewIntentState };
export default ViewIntentState.Instance;
//# sourceMappingURL=view-intent-state.js.map