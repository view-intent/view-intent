var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { action, computed, observable } from "mobx";
import { process } from "uniqid";
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
    }
    ViewState.prototype.setState = function (state) {
        if (state === void 0) { state = {}; }
        this.viewState = state;
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ViewState.prototype, "viewState", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ViewState.prototype, "setState", null);
    return ViewState;
}());
export { ViewState };
var FrameState = /** @class */ (function () {
    function FrameState(frameId) {
        this.frameId = frameId;
    }
    __decorate([
        observable,
        __metadata("design:type", String)
    ], FrameState.prototype, "frameId", void 0);
    return FrameState;
}());
export { FrameState };
var ViewIntentState = /** @class */ (function () {
    function ViewIntentState() {
        this.viewList = [];
        this.intentList = []; // viewType:instanceId
        // @computed get unfinishedTodoCount() {
        // 	return this.todos.filter(todo => !todo.finished).length;
        // }
        // @action public set(state: Authority): void {
        // }
        // @computed get view(): boolean {
        // 	return false;
        // }
        // @action public insert(user: any): void {
        // 	this.user.push(user);
        // }
    }
    Object.defineProperty(ViewIntentState, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    // computed -------------
    ViewIntentState.prototype.getViewsByFrameId = function (frameId) {
        return this.viewList.filter(function (viewInstance, index) {
            return viewInstance.config.frameId === frameId;
        });
    };
    ViewIntentState.prototype.getActiveViewsByFrameId = function (frameId) {
        return this.viewList.filter(function (viewInstance, index) {
            var intent = [];
            return viewInstance.config.frameId === frameId;
        });
    };
    ViewIntentState.prototype.getViewById = function (viewId) {
        return this.viewList.find(function (value) {
            return value.viewId === viewId;
        });
    };
    // action -----------------
    ViewIntentState.prototype.intent = function (intent) {
        var viewType = ViewTypeStore.getViewType(intent.ViewType);
        if (viewType === undefined || viewType === null) {
            throw new Error("this viewType doesn't exist...");
        }
    };
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ViewIntentState.prototype, "viewList", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ViewIntentState.prototype, "intentList", void 0);
    __decorate([
        computed,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Array)
    ], ViewIntentState.prototype, "getViewsByFrameId", null);
    __decorate([
        computed,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Array)
    ], ViewIntentState.prototype, "getActiveViewsByFrameId", null);
    __decorate([
        computed,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Object)
    ], ViewIntentState.prototype, "getViewById", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ViewIntentState.prototype, "intent", null);
    return ViewIntentState;
}());
export { ViewIntentState };
export default ViewStore.Instance;
//# sourceMappingURL=view-store.js.map