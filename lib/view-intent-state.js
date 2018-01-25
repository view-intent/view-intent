"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var mobx_1 = require("mobx");
// import { observer } from "mobx-react";
var uniqid_1 = require("uniqid");
var view_type_store_1 = require("./view-type-store");
// declare module lodash;
// const lodash: any = require("lodash");
var ViewState = /** @class */ (function () {
    function ViewState(intent) {
        this.viewState = {};
        this.viewType = intent.viewType;
        this.areaName = intent.areaName;
        if (intent.instanceId === null || intent.instanceId === undefined || intent.instanceId === "new" || intent.instanceId === "last") {
            this.instanceId = uniqid_1.process();
        }
        else {
            this.instanceId = intent.instanceId;
        }
        this.viewState = intent.viewState;
        this.ViewTypeInfo = view_type_store_1.ViewTypeStore.getViewTypeInfo(this.areaName, this.viewType);
        if (this.ViewTypeInfo === undefined) {
            throw new Error("The View \"" + this.areaName + "." + this.viewType + "\"  wasn't registered.");
        }
        else {
            this.frameId = this.ViewTypeInfo.frameId;
        }
    }
    Object.defineProperty(ViewState.prototype, "storeName", {
        get: function () {
            return this.areaName.toLowerCase() + "." + this.viewType.replace(new RegExp("-", "g"), "").toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
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
        mobx_1.observable,
        __metadata("design:type", Object)
    ], ViewState.prototype, "viewState", void 0);
    __decorate([
        mobx_1.computed,
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], ViewState.prototype, "isVisible", null);
    __decorate([
        mobx_1.action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ViewState.prototype, "setState", null);
    return ViewState;
}());
exports.ViewState = ViewState;
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
        return lodash_1.default.findLast(this.viewStateList, function (viewState) {
            return viewState.viewType.toLowerCase() === viewType && viewState.areaName.toLowerCase() === areaName;
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
        if (intent.viewType !== null && intent.viewType !== undefined) {
            intent.viewType = intent.viewType.toLowerCase();
            intent.viewType = intent.viewType.replace(/-/g, "");
        }
        if (intent.instanceId === null || intent.instanceId === undefined) {
            intent.instanceId = "last";
        }
        var newVisible = [];
        var processor = function (loopIntent) {
            var currentView = null;
            // if (loopIntent.instanceType === InstanceTypeProtocol.lastInstance) {
            if (loopIntent.instanceId === "last") {
                // last instance
                currentView = _this.getLastViewStateByType(loopIntent.areaName, loopIntent.viewType);
                // console.log("last by type", currentView);
            }
            else if (loopIntent.instanceId.toLowerCase() !== "last" && loopIntent.instanceId.toLowerCase() !== "new" && loopIntent.instanceId !== null && loopIntent.instanceId !== undefined) {
                // instance id
                currentView = _this.getViewStateById(loopIntent.instanceId);
            }
            // new instance
            if (loopIntent.instanceId === "new" || currentView === null || currentView === undefined) {
                currentView = _this.newViewInstance(loopIntent);
            }
            // setState
            if (loopIntent.viewState !== null && loopIntent.viewState !== undefined) {
                currentView.viewState = loopIntent.viewState;
            }
            // return if don't exist
            if (currentView.ViewTypeInfo !== undefined || currentView.ViewTypeInfo !== null) {
                // requires ----------------
                // console.error(currentView.viewType);
                // console.error(currentView.ViewTypeInfo);
                // setImmediate(() => {
                // 	console.error(currentView.ViewTypeInfo);
                // });
                currentView.ViewTypeInfo.require.forEach(function (viewTypePath) {
                    if (viewTypePath.indexOf(".") > -1) {
                        var areaName = viewTypePath.split(".")[0];
                        var viewType = viewTypePath.split(".")[1];
                        var viewTypeConstructor = view_type_store_1.ViewTypeStore.getViewType(areaName, viewType);
                        if (viewTypeConstructor !== undefined && viewTypeConstructor !== null) {
                            var newIntent = {
                                instanceId: "last",
                                areaName: areaName,
                                viewType: viewType,
                                viewState: null,
                            };
                            processor(newIntent);
                        }
                    }
                    else {
                        throw new Error("Require views with using the path with the 'areaName'. Ex.: (areaName.ViewClassName);");
                    }
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
        mobx_1.observable,
        __metadata("design:type", Array)
    ], ViewIntentState.prototype, "viewStateList", void 0);
    __decorate([
        mobx_1.observable,
        __metadata("design:type", Array)
    ], ViewIntentState.prototype, "visibleViewIdList", void 0);
    __decorate([
        mobx_1.action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ViewIntentState.prototype, "processIntent", null);
    __decorate([
        mobx_1.action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", ViewState)
    ], ViewIntentState.prototype, "newViewInstance", null);
    return ViewIntentState;
}());
exports.ViewIntentState = ViewIntentState;
exports.default = ViewIntentState.Instance;
//# sourceMappingURL=view-intent-state.js.map