var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import lodash from "lodash";
import { action, computed, observable } from "mobx";
import { process } from "uniqid";
import { InstanceTypeProtocol } from "./types";
import { ViewTypeStore } from "./view-type-store";
var ViewState = /** @class */ (function () {
    function ViewState(intent) {
        this.viewState = {};
        this.viewType = intent.viewType;
        if (intent.instanceId === null || intent.instanceId === undefined) {
            this.instanceId = process();
        }
        else {
            this.instanceId = intent.instanceId;
        }
        this.viewState = intent.viewState;
        this.ViewTypeInfo = ViewTypeStore.getViewTypeInfo(this.viewType);
        if (this.ViewTypeInfo === undefined) {
            console.warn(this.viewType, "The View wasn't registered.");
        }
        else {
            this.frameId = this.ViewTypeInfo.frameId;
        }
    }
    Object.defineProperty(ViewState.prototype, "isVisible", {
        get: function () {
            return ViewIntentState.Instance.isViewVisible(this);
        },
        enumerable: true,
        configurable: true
    });
    ViewState.prototype.setState = function (state) {
        if (state === void 0) { state = {}; }
        this.viewState = state;
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ViewState.prototype, "viewState", void 0);
    __decorate([
        computed,
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], ViewState.prototype, "isVisible", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ViewState.prototype, "setState", null);
    return ViewState;
}());
export { ViewState };
var ViewIntentState = /** @class */ (function () {
    function ViewIntentState() {
        this.viewStateList = [];
        this.visibleViewIdList = [];
    }
    Object.defineProperty(ViewIntentState, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    ViewIntentState.prototype.getViewStateListByFrameId = function (frameId) {
        return this.viewStateList.filter(function (viewState, index) {
            return viewState.frameId === frameId;
        });
    };
    ViewIntentState.prototype.getLastViewStateByType = function (viewType) {
        return lodash.findLast(this.viewStateList, function (viewState) {
            return viewState.viewType.toLowerCase() === viewType.toLowerCase();
        });
    };
    ViewIntentState.prototype.getViewStateById = function (instanceId) {
        return this.viewStateList.find(function (viewState) {
            return viewState.instanceId.toLowerCase() === instanceId.toLowerCase();
        });
    };
    ViewIntentState.prototype.isViewVisible = function (viewState) {
        return this.visibleViewIdList.indexOf(viewState.instanceId.toLowerCase()) > -1;
    };
    ViewIntentState.prototype.processIntent = function (intent) {
        var _this = this;
        var newVisible = [];
        var processor = function (loopIntent) {
            var currentView = null;
            // last instance
            if (loopIntent.instanceType === InstanceTypeProtocol.lastInstance) {
                currentView = _this.getLastViewStateByType(loopIntent.viewType);
            }
            // instance id
            if (loopIntent.instanceType === InstanceTypeProtocol.id) {
                currentView = _this.getViewStateById(loopIntent.instanceId);
            }
            // new instance
            if (loopIntent.instanceType === InstanceTypeProtocol.newInstance || currentView === null || currentView === undefined) {
                currentView = _this.newViewInstance(loopIntent);
            }
            // return if don't exist
            if (currentView.ViewTypeInfo !== undefined || currentView.ViewTypeInfo !== null) {
                // requires ----------------
                currentView.ViewTypeInfo.require.forEach(function (viewTypeConstructor) {
                    var viewTypeName = viewTypeConstructor.name.toLocaleLowerCase();
                    var newIntent = {
                        viewType: viewTypeName,
                        instanceType: InstanceTypeProtocol.lastInstance,
                        viewState: null,
                    };
                    processor(newIntent);
                });
            }
            newVisible.push(currentView.instanceId);
        };
        processor(intent);
        this.visibleViewIdList = newVisible;
    };
    ViewIntentState.prototype.newViewInstance = function (intent) {
        this.viewStateList.push(new ViewState(intent));
        var index = this.viewStateList.length - 1;
        return this.viewStateList[index];
    };
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ViewIntentState.prototype, "viewStateList", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ViewIntentState.prototype, "visibleViewIdList", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ViewIntentState.prototype, "processIntent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", ViewState)
    ], ViewIntentState.prototype, "newViewInstance", null);
    return ViewIntentState;
}());
export { ViewIntentState };
export default ViewIntentState.Instance;
//# sourceMappingURL=states.js.map