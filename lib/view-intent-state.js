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
// import { observer } from "mobx-react";
import { process } from "uniqid";
import { ViewTypeStore } from "./view-type-store";
// declare module lodash;
// const lodash: any = require("lodash");
export class ViewState {
    constructor(intent) {
        this.viewState = {};
        this.viewType = intent.viewType;
        this.areaName = intent.areaName;
        if (intent.instanceId === null || intent.instanceId === undefined || intent.instanceId === "new" || intent.instanceId === "last") {
            this.instanceId = process();
        }
        else {
            this.instanceId = intent.instanceId;
        }
        this.viewState = intent.viewState;
        this.ViewTypeInfo = ViewTypeStore.getViewTypeInfo(this.areaName, this.viewType);
        if (this.ViewTypeInfo === undefined) {
            throw new Error(`The View "${this.areaName}.${this.viewType}"  wasn't registered.`);
        }
        else {
            this.frameId = this.ViewTypeInfo.frameId;
        }
    }
    get storeName() {
        return this.areaName.toLowerCase() + "." + this.viewType.replace(new RegExp("-", "g"), "").toLowerCase();
    }
    get isVisible() {
        return ViewIntentState.Instance.isViewVisible(this);
    }
    setState(state = {}) {
        this.viewState = state;
    }
}
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
export class ViewIntentState {
    constructor() {
        this.viewStateList = [];
        this.visibleViewIdList = [];
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    getViewStateListByFrameId(frameId) {
        if (frameId !== null && frameId !== undefined) {
            return this.viewStateList.filter((viewState, index) => {
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
    }
    getLastViewStateByType(areaName, viewType) {
        if (viewType !== null && viewType !== undefined && areaName !== null && areaName !== undefined) {
            areaName = areaName.toLowerCase();
            viewType = viewType.toLowerCase();
            viewType = viewType.replace(/-/g, "");
        }
        else {
            throw new Error(`The arguments "AreaName" and "ViewType" must be passed.`);
        }
        return lodash.findLast(this.viewStateList, (viewState) => {
            return viewState.viewType.toLowerCase() === viewType && viewState.areaName.toLowerCase() === areaName;
        });
    }
    getViewStateById(intent) {
        if (intent.instanceId !== undefined && intent.instanceId !== null) {
            intent.instanceId = intent.instanceId.toLowerCase();
        }
        intent.viewType = intent.viewType.toLowerCase();
        intent.areaName = intent.areaName.toLowerCase();
        if (intent === null || intent === undefined) {
            return this.viewStateList.find((viewState) => {
                if (viewState.instanceId.toLowerCase() === intent.viewType &&
                    viewState.viewType.toLowerCase() === intent.viewType &&
                    viewState.areaName.toLowerCase() === intent.areaName) {
                    return true;
                }
            });
        }
        return null;
    }
    isViewVisible(viewState) {
        return this.visibleViewIdList.indexOf(viewState.instanceId.toLowerCase()) > -1;
    }
    processIntent(intent) {
        if (intent.viewType !== null && intent.viewType !== undefined) {
            intent.viewType = intent.viewType.toLowerCase();
            intent.viewType = intent.viewType.replace(/-/g, "");
        }
        if (intent.instanceId === null || intent.instanceId === undefined) {
            intent.instanceId = "last";
        }
        const newVisible = [];
        const processor = (loopIntent) => {
            let currentView = null;
            // if (loopIntent.instanceType === InstanceTypeProtocol.lastInstance) {
            if (loopIntent.instanceId === "last") {
                // last instance
                currentView = this.getLastViewStateByType(loopIntent.areaName, loopIntent.viewType);
                // console.log("last by type", currentView);
            }
            else if (loopIntent.instanceId.toLowerCase() !== "last" && loopIntent.instanceId.toLowerCase() !== "new" && loopIntent.instanceId !== null && loopIntent.instanceId !== undefined) {
                // instance id
                currentView = this.getViewStateById(loopIntent);
            }
            // new instance
            if (loopIntent.instanceId === "new" || currentView === null || currentView === undefined) {
                currentView = this.newViewInstance(loopIntent);
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
                currentView.ViewTypeInfo.require.forEach((viewTypePath) => {
                    if (viewTypePath.indexOf(".") > -1) {
                        const areaName = viewTypePath.split(".")[0];
                        const viewType = viewTypePath.split(".")[1];
                        const viewTypeConstructor = ViewTypeStore.getViewType(areaName, viewType);
                        if (viewTypeConstructor !== undefined && viewTypeConstructor !== null) {
                            const newIntent = {
                                instanceId: "last",
                                areaName,
                                viewType,
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
    }
    newViewInstance(intent) {
        this.viewStateList.push(new ViewState(intent));
        const index = this.viewStateList.length - 1;
        return this.viewStateList[index];
    }
}
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
export default ViewIntentState.Instance;
//# sourceMappingURL=view-intent-state.js.map