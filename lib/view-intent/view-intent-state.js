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
const main_1 = require("../mobx/main"); // "view-intent-mobx";
const uniqid_1 = require("uniqid");
const view_type_store_1 = require("./view-type-store");
const helper_1 = require("./helper");
const utility_collection_1 = require("utility-collection");
const window_history_helper_1 = require("./window-history-helper");
class ViewState {
    constructor(intent, root) {
        this.require = null;
        this.visible = false;
        this.viewState = {};
        this.store = ViewIntentState.Instance;
        this.stateInstance = ViewIntentState.Instance;
        this.root = root;
        this.viewType = intent.viewType;
        this.areaName = intent.areaName;
        if (utility_collection_1.Is.empty(intent.instanceId) || intent.instanceId === "new" || intent.instanceId === "last") {
            this.instanceId = uniqid_1.process();
        }
        else {
            this.instanceId = intent.instanceId.toString();
        }
        this.viewState = intent.viewState;
        this.viewTypeInfo = view_type_store_1.ViewTypeStore.getViewTypeInfo(this.areaName, this.viewType);
        if (this.viewTypeInfo === undefined) {
            throw new Error(`The View "${this.areaName}.${this.viewType}"  wasn't registered.`);
        }
        else {
            this.frameId = this.viewTypeInfo.frameId;
        }
    }
    get storeName() {
        return this.areaName.toLowerCase() + "." + this.viewType.replace(new RegExp("-", "g"), "").toLowerCase();
    }
    show(processRequires) {
        if (!this.visible) {
            this.visible = true;
            if (this.require === null) {
                this.require = this.viewTypeInfo.require;
            }
            processRequires && this.require && this.require.forEach((requireItem) => {
                if (requireItem !== "global.stack") {
                    const requireViewState = this.stateInstance.getViewStateByIntent(requireItem);
                    requireViewState && requireViewState.show(true);
                }
            });
            this.root.notify();
        }
    }
    hide() {
        if (this.visible) {
            this.visible = false;
            this.root.notify();
        }
    }
    getViewInstanceAddress() {
        return (`${this.areaName}.${this.viewType}:${this.instanceId}`).toLowerCase();
    }
    setState(state = {}) {
        this.viewState = state;
    }
}
__decorate([
    main_1.observable,
    __metadata("design:type", Boolean)
], ViewState.prototype, "visible", void 0);
__decorate([
    main_1.observable,
    __metadata("design:type", Object)
], ViewState.prototype, "viewState", void 0);
__decorate([
    main_1.observable,
    __metadata("design:type", Object)
], ViewState.prototype, "store", void 0);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], ViewState.prototype, "show", null);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ViewState.prototype, "hide", null);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewState.prototype, "setState", null);
exports.ViewState = ViewState;
class ViewIntentState {
    constructor() {
        this.viewStateList = [];
        this.version = 0;
        this.lastProcessed = "";
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
        const i = this.viewStateList.findIndex((viewState) => {
            return viewState.viewType.toLowerCase() === viewType && viewState.areaName.toLowerCase() === areaName;
        });
        const r = this.viewStateList[i];
        if (i >= 0 && r !== undefined) {
            return r;
        }
        return null;
    }
    getViewStateById(intent, generate = false) {
        if (intent === null) {
            return null;
        }
        let r;
        if (!utility_collection_1.Is.empty(intent.instanceId)) {
            intent.instanceId = intent.instanceId && intent.instanceId.toLowerCase();
            intent.viewType = intent.viewType.toLowerCase();
            intent.areaName = intent.areaName.toLowerCase();
            r = this.viewStateList.find((viewState) => {
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
    }
    getViewStateByIntent(intent) {
        if (typeof intent === "string") {
            intent = helper_1.Helper.pathToIntent(intent);
        }
        let returnView = null;
        if (intent.instanceId === undefined || intent.instanceId === null || intent.instanceId === "last") {
            // last
            returnView = this.getLastViewStateByType(intent.areaName, intent.viewType);
        }
        else if (intent.instanceId === "new") {
            // new 
            intent.instanceId = uniqid_1.process();
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
    }
    getVisibleViewState() {
        const r = this.viewStateList.filter((viewState) => {
            return viewState.visible;
        });
        return r;
    }
    getVisibleViewStateAddresses() {
        const r = this.getVisibleViewState().map((ViewState) => {
            return ViewState.getViewInstanceAddress();
        });
        return r;
    }
    newViewInstance(intent, unshift = false) {
        if (unshift) {
            this.viewStateList.unshift(new ViewState(intent, this));
            return this.viewStateList[0];
        }
        else {
            this.viewStateList.push(new ViewState(intent, this));
            const index = this.viewStateList.length - 1;
            return this.viewStateList[index];
        }
    }
    hideAll() {
        this.viewStateList.forEach((viewState) => {
            viewState.hide();
        });
    }
    showViewStatesByAddresses(viewStateAddresses) {
        this.viewStateList.forEach((viewState) => {
            const viewStateAddress = viewState.getViewInstanceAddress();
            if (viewStateAddresses.indexOf(viewStateAddress) > -1) {
                viewState.show(false);
            }
            else {
                viewState.hide();
            }
        });
    }
    processPopIntent(navState) {
        if (navState.visibleViewStates !== null) {
            this.showViewStatesByAddresses(navState.visibleViewStates);
        }
    }
    processIntent(intent, url = null) {
        const currentView = this.getViewStateByIntent(intent);
        if (currentView) {
            if (currentView.viewTypeInfo.require.indexOf("global.stack") === -1) {
                this.hideAll();
            }
            currentView && currentView.show(true);
        }
        window_history_helper_1.WindowHistoryHelper.setCurrentStateViewAddresses(this.getVisibleViewStateAddresses());
    }
    notify() {
        this.version++;
    }
}
__decorate([
    main_1.observable,
    __metadata("design:type", Array)
], ViewIntentState.prototype, "viewStateList", void 0);
__decorate([
    main_1.observable,
    __metadata("design:type", Number)
], ViewIntentState.prototype, "version", void 0);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", ViewState)
], ViewIntentState.prototype, "newViewInstance", null);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ViewIntentState.prototype, "hideAll", null);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ViewIntentState.prototype, "showViewStatesByAddresses", null);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewIntentState.prototype, "processPopIntent", null);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ViewIntentState.prototype, "processIntent", null);
__decorate([
    main_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ViewIntentState.prototype, "notify", null);
exports.ViewIntentState = ViewIntentState;
exports.default = ViewIntentState.Instance;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC92aWV3LWludGVudC1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHVDQUEwRyxDQUFDLHNCQUFzQjtBQUNqSSxtQ0FBaUM7QUFHakMsdURBQWtEO0FBQ2xELHFDQUFrQztBQUNsQywyREFBbUQ7QUFFbkQsbUVBQThEO0FBRTlEO0lBZUUsWUFBWSxNQUFlLEVBQUUsSUFBcUI7UUFMM0MsWUFBTyxHQUFvQixJQUFJLENBQUM7UUFDcEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQzNCLFVBQUssR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzVDLGtCQUFhLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUUvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksdUJBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1lBQzlGLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQU8sRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRywrQkFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRixJQUFJLElBQUksQ0FBQyxZQUFZ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Z0pDO0FBQ0Qsa0JBQWUsZUFBZSxDQUFDLFFBQVEsQ0FBQyIsImZpbGUiOiJ2aWV3LWludGVudC92aWV3LWludGVudC1zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFjdGlvbiwgY29tcHV0ZWQsIGV4dGVuZFNoYWxsb3dPYnNlcnZhYmxlLCBvYnNlcnZhYmxlLCBPYnNlcnZhYmxlTWFwLCB0b0pTIH0gZnJvbSBcIi4uL21vYngvbWFpblwiOyAvLyBcInZpZXctaW50ZW50LW1vYnhcIjtcclxuaW1wb3J0IHsgcHJvY2VzcyB9IGZyb20gXCJ1bmlxaWRcIjtcclxuaW1wb3J0IHsgSUludGVudCwgSU5hdlN0YXRlIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcclxuaW1wb3J0IHsgVmlld1R5cGVTdG9yZSB9IGZyb20gXCIuL3ZpZXctdHlwZS1zdG9yZVwiO1xyXG5pbXBvcnQgeyBIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJcIjtcclxuaW1wb3J0IHsgSXMsIFVybCwgTGlzdCB9IGZyb20gXCJ1dGlsaXR5LWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IG1vYnggZnJvbSBcIm1vYnhcIjtcclxuaW1wb3J0IHsgV2luZG93SGlzdG9yeUhlbHBlciB9IGZyb20gXCIuL3dpbmRvdy1oaXN0b3J5LWhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdTdGF0ZSB7XHJcbiAgcHVibGljIHJvb3Q6IFZpZXdJbnRlbnRTdGF0ZTtcclxuICBwdWJsaWMgYXJlYU5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgZ2V0IHN0b3JlTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJlYU5hbWUudG9Mb3dlckNhc2UoKSArIFwiLlwiICsgdGhpcy52aWV3VHlwZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCItXCIsIFwiZ1wiKSwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcbiAgcHVibGljIHZpZXdUeXBlOiBzdHJpbmc7XHJcbiAgcHVibGljIGluc3RhbmNlSWQ6IHN0cmluZztcclxuICBwdWJsaWMgZnJhbWVJZDogc3RyaW5nO1xyXG4gIHB1YmxpYyB2aWV3VHlwZUluZm86IFZpZXdUeXBlU3RvcmUuSVZpZXdUeXBlSW5mbztcclxuICBwdWJsaWMgcmVxdWlyZTogc3RyaW5nW10gfCBudWxsID0gbnVsbDtcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBvYnNlcnZhYmxlIHB1YmxpYyB2aWV3U3RhdGU6IGFueSB8IG51bGwgPSB7fTtcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgc3RvcmUgPSBWaWV3SW50ZW50U3RhdGUuSW5zdGFuY2U7XHJcbiAgcHJpdmF0ZSBzdGF0ZUluc3RhbmNlID0gVmlld0ludGVudFN0YXRlLkluc3RhbmNlO1xyXG4gIGNvbnN0cnVjdG9yKGludGVudDogSUludGVudCwgcm9vdDogVmlld0ludGVudFN0YXRlKSB7XHJcbiAgICB0aGlzLnJvb3QgPSByb290O1xyXG4gICAgdGhpcy52aWV3VHlwZSA9IGludGVudC52aWV3VHlwZTtcclxuICAgIHRoaXMuYXJlYU5hbWUgPSBpbnRlbnQuYXJlYU5hbWU7XHJcbiAgICBpZiAoSXMuZW1wdHkoaW50ZW50Lmluc3RhbmNlSWQpIHx8IGludGVudC5pbnN0YW5jZUlkID09PSBcIm5ld1wiIHx8IGludGVudC5pbnN0YW5jZUlkID09PSBcImxhc3RcIikge1xyXG4gICAgICB0aGlzLmluc3RhbmNlSWQgPSBwcm9jZXNzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluc3RhbmNlSWQgPSBpbnRlbnQuaW5zdGFuY2VJZCEudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIHRoaXMudmlld1N0YXRlID0gaW50ZW50LnZpZXdTdGF0ZTtcclxuICAgIHRoaXMudmlld1R5cGVJbmZvID0gVmlld1R5cGVTdG9yZS5nZXRWaWV3VHlwZUluZm8odGhpcy5hcmVhTmFtZSwgdGhpcy52aWV3VHlwZSk7XHJcbiAgICBpZiAodGhpcy52aWV3VHlwZUluZm8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBWaWV3IFwiJHt0aGlzLmFyZWFOYW1lfS4ke3RoaXMudmlld1R5cGV9XCIgIHdhc24ndCByZWdpc3RlcmVkLmApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mcmFtZUlkID0gdGhpcy52aWV3VHlwZUluZm8uZnJhbWVJZDtcclxuICAgIH1cclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgc2hvdyhwcm9jZXNzUmVxdWlyZXM6IGJvb2xlYW4pIHtcclxuICAgIGlmICghdGhpcy52aXNpYmxlKSB7XHJcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIGlmICh0aGlzLnJlcXVpcmUgPT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmUgPSB0aGlzLnZpZXdUeXBlSW5mby5yZXF1aXJlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb2Nlc3NSZXF1aXJlcyAmJiB0aGlzLnJlcXVpcmUgJiYgdGhpcy5yZXF1aXJlLmZvckVhY2goKHJlcXVpcmVJdGVtKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcXVpcmVJdGVtICE9PSBcImdsb2JhbC5zdGFja1wiKSB7XHJcbiAgICAgICAgICBjb25zdCByZXF1aXJlVmlld1N0YXRlID0gdGhpcy5zdGF0ZUluc3RhbmNlLmdldFZpZXdTdGF0ZUJ5SW50ZW50KHJlcXVpcmVJdGVtKTtcclxuICAgICAgICAgIHJlcXVpcmVWaWV3U3RhdGUgJiYgcmVxdWlyZVZpZXdTdGF0ZS5zaG93KHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucm9vdC5ub3RpZnkoKTtcclxuICAgIH1cclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgaGlkZSgpIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUpIHtcclxuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucm9vdC5ub3RpZnkoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldFZpZXdJbnN0YW5jZUFkZHJlc3MoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoYCR7dGhpcy5hcmVhTmFtZX0uJHt0aGlzLnZpZXdUeXBlfToke3RoaXMuaW5zdGFuY2VJZH1gKS50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuICBAYWN0aW9uIHB1YmxpYyBzZXRTdGF0ZShzdGF0ZTogYW55IHwgbnVsbCA9IHt9KTogdm9pZCB7XHJcbiAgICB0aGlzLnZpZXdTdGF0ZSA9IHN0YXRlO1xyXG4gIH1cclxufVxyXG5leHBvcnQgY2xhc3MgVmlld0ludGVudFN0YXRlIHtcclxuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFZpZXdJbnRlbnRTdGF0ZTtcclxuICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBWaWV3SW50ZW50U3RhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gIH1cclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgdmlld1N0YXRlTGlzdDogVmlld1N0YXRlW10gPSBbXTtcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgdmVyc2lvbjogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIGxhc3RQcm9jZXNzZWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHVibGljIGdldFZpZXdTdGF0ZUxpc3RCeUZyYW1lSWQoZnJhbWVJZDogc3RyaW5nIHwgbnVsbCk6IFZpZXdTdGF0ZVtdIHtcclxuICAgIGlmIChmcmFtZUlkICE9PSBudWxsICYmIGZyYW1lSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy52aWV3U3RhdGVMaXN0LmZpbHRlcigodmlld1N0YXRlOiBWaWV3U3RhdGUsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAodmlld1N0YXRlLmZyYW1lSWQgIT09IG51bGwgJiYgdmlld1N0YXRlLmZyYW1lSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHZpZXdTdGF0ZS5mcmFtZUlkLnRvTG93ZXJDYXNlKCkgPT09IGZyYW1lSWQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRMYXN0Vmlld1N0YXRlQnlUeXBlKGFyZWFOYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBzdHJpbmcpOiBWaWV3U3RhdGUgfCBudWxsIHtcclxuICAgIGlmICh2aWV3VHlwZSAhPT0gbnVsbCAmJiB2aWV3VHlwZSAhPT0gdW5kZWZpbmVkICYmIGFyZWFOYW1lICE9PSBudWxsICYmIGFyZWFOYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgYXJlYU5hbWUgPSBhcmVhTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB2aWV3VHlwZSA9IHZpZXdUeXBlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIHZpZXdUeXBlID0gdmlld1R5cGUucmVwbGFjZSgvLS9nLCBcIlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGFyZ3VtZW50cyBcIkFyZWFOYW1lXCIgYW5kIFwiVmlld1R5cGVcIiBtdXN0IGJlIHBhc3NlZC5gKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGk6IG51bWJlciA9IHRoaXMudmlld1N0YXRlTGlzdC5maW5kSW5kZXgoKHZpZXdTdGF0ZTogVmlld1N0YXRlKSA9PiB7XHJcbiAgICAgIHJldHVybiB2aWV3U3RhdGUudmlld1R5cGUudG9Mb3dlckNhc2UoKSA9PT0gdmlld1R5cGUgJiYgdmlld1N0YXRlLmFyZWFOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGFyZWFOYW1lO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCByID0gdGhpcy52aWV3U3RhdGVMaXN0W2ldO1xyXG4gICAgaWYgKGkgPj0gMCAmJiByICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcHVibGljIGdldFZpZXdTdGF0ZUJ5SWQoaW50ZW50OiBJSW50ZW50LCBnZW5lcmF0ZTogYm9vbGVhbiA9IGZhbHNlKTogVmlld1N0YXRlIHwgbnVsbCB7XHJcbiAgICBpZiAoaW50ZW50ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgbGV0IHI6IFZpZXdTdGF0ZSB8IHVuZGVmaW5lZDtcclxuICAgIGlmICghSXMuZW1wdHkoaW50ZW50Lmluc3RhbmNlSWQpKSB7XHJcbiAgICAgIGludGVudC5pbnN0YW5jZUlkID0gaW50ZW50Lmluc3RhbmNlSWQgJiYgaW50ZW50Lmluc3RhbmNlSWQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaW50ZW50LnZpZXdUeXBlID0gaW50ZW50LnZpZXdUeXBlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGludGVudC5hcmVhTmFtZSA9IGludGVudC5hcmVhTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICByID0gdGhpcy52aWV3U3RhdGVMaXN0LmZpbmQoKHZpZXdTdGF0ZTogVmlld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYgKHZpZXdTdGF0ZS5pbnN0YW5jZUlkLnRvTG93ZXJDYXNlKCkgPT09IGludGVudC5pbnN0YW5jZUlkICYmXHJcbiAgICAgICAgICB2aWV3U3RhdGUudmlld1R5cGUudG9Mb3dlckNhc2UoKSA9PT0gaW50ZW50LnZpZXdUeXBlICYmXHJcbiAgICAgICAgICB2aWV3U3RhdGUuYXJlYU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gaW50ZW50LmFyZWFOYW1lKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gciBhcyBWaWV3U3RhdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChnZW5lcmF0ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICByID0gdGhpcy5uZXdWaWV3SW5zdGFuY2UoaW50ZW50LCBmYWxzZSk7XHJcbiAgICAgIHJldHVybiByO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRWaWV3U3RhdGVCeUludGVudChpbnRlbnQ6IElJbnRlbnQgfCBzdHJpbmcpOiBWaWV3U3RhdGUgfCBudWxsIHtcclxuICAgIGlmICh0eXBlb2YgaW50ZW50ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGludGVudCA9IEhlbHBlci5wYXRoVG9JbnRlbnQoaW50ZW50KTtcclxuICAgIH1cclxuICAgIGxldCByZXR1cm5WaWV3OiBWaWV3U3RhdGUgfCBudWxsID0gbnVsbDtcclxuICAgIGlmIChpbnRlbnQuaW5zdGFuY2VJZCA9PT0gdW5kZWZpbmVkIHx8IGludGVudC5pbnN0YW5jZUlkID09PSBudWxsIHx8IGludGVudC5pbnN0YW5jZUlkID09PSBcImxhc3RcIikge1xyXG4gICAgICAvLyBsYXN0XHJcbiAgICAgIHJldHVyblZpZXcgPSB0aGlzLmdldExhc3RWaWV3U3RhdGVCeVR5cGUoaW50ZW50LmFyZWFOYW1lLCBpbnRlbnQudmlld1R5cGUpO1xyXG4gICAgfSBlbHNlIGlmIChpbnRlbnQuaW5zdGFuY2VJZCA9PT0gXCJuZXdcIikge1xyXG4gICAgICAvLyBuZXcgXHJcbiAgICAgIGludGVudC5pbnN0YW5jZUlkID0gcHJvY2VzcygpO1xyXG4gICAgICByZXR1cm5WaWV3ID0gdGhpcy5uZXdWaWV3SW5zdGFuY2UoaW50ZW50LCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpZFxyXG4gICAgICByZXR1cm5WaWV3ID0gdGhpcy5nZXRWaWV3U3RhdGVCeUlkKGludGVudCk7XHJcbiAgICB9XHJcbiAgICAvLyBuZXdcclxuICAgIGlmIChyZXR1cm5WaWV3ID09PSBudWxsIHx8IHJldHVyblZpZXcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm5WaWV3ID0gdGhpcy5uZXdWaWV3SW5zdGFuY2UoaW50ZW50LCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuVmlldztcclxuICB9XHJcbiAgcHVibGljIGdldFZpc2libGVWaWV3U3RhdGUoKTogVmlld1N0YXRlW10ge1xyXG4gICAgY29uc3QgcjogVmlld1N0YXRlW10gPSB0aGlzLnZpZXdTdGF0ZUxpc3QuZmlsdGVyKCh2aWV3U3RhdGUpID0+IHtcclxuICAgICAgcmV0dXJuIHZpZXdTdGF0ZS52aXNpYmxlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcbiAgcHVibGljIGdldFZpc2libGVWaWV3U3RhdGVBZGRyZXNzZXMoKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3Qgcjogc3RyaW5nW10gPSB0aGlzLmdldFZpc2libGVWaWV3U3RhdGUoKS5tYXAoKFZpZXdTdGF0ZSkgPT4ge1xyXG4gICAgICByZXR1cm4gVmlld1N0YXRlLmdldFZpZXdJbnN0YW5jZUFkZHJlc3MoKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHI7XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIG5ld1ZpZXdJbnN0YW5jZShpbnRlbnQ6IElJbnRlbnQsIHVuc2hpZnQ6IGJvb2xlYW4gPSBmYWxzZSk6IFZpZXdTdGF0ZSB7XHJcbiAgICBpZiAodW5zaGlmdCkge1xyXG4gICAgICB0aGlzLnZpZXdTdGF0ZUxpc3QudW5zaGlmdChuZXcgVmlld1N0YXRlKGludGVudCwgdGhpcykpO1xyXG4gICAgICByZXR1cm4gdGhpcy52aWV3U3RhdGVMaXN0WzBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aWV3U3RhdGVMaXN0LnB1c2gobmV3IFZpZXdTdGF0ZShpbnRlbnQsIHRoaXMpKTtcclxuICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMudmlld1N0YXRlTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICByZXR1cm4gdGhpcy52aWV3U3RhdGVMaXN0W2luZGV4XTtcclxuICAgIH1cclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgaGlkZUFsbCgpOiB2b2lkIHtcclxuICAgIHRoaXMudmlld1N0YXRlTGlzdC5mb3JFYWNoKCh2aWV3U3RhdGUpID0+IHtcclxuICAgICAgdmlld1N0YXRlLmhpZGUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBAYWN0aW9uIHB1YmxpYyBzaG93Vmlld1N0YXRlc0J5QWRkcmVzc2VzKHZpZXdTdGF0ZUFkZHJlc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgIHRoaXMudmlld1N0YXRlTGlzdC5mb3JFYWNoKCh2aWV3U3RhdGUpID0+IHtcclxuICAgICAgY29uc3Qgdmlld1N0YXRlQWRkcmVzczogc3RyaW5nID0gdmlld1N0YXRlLmdldFZpZXdJbnN0YW5jZUFkZHJlc3MoKTtcclxuICAgICAgaWYgKHZpZXdTdGF0ZUFkZHJlc3Nlcy5pbmRleE9mKHZpZXdTdGF0ZUFkZHJlc3MpID4gLTEpIHtcclxuICAgICAgICB2aWV3U3RhdGUuc2hvdyhmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmlld1N0YXRlLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIHByb2Nlc3NQb3BJbnRlbnQobmF2U3RhdGU6IElOYXZTdGF0ZSkge1xyXG4gICAgaWYgKG5hdlN0YXRlLnZpc2libGVWaWV3U3RhdGVzICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2hvd1ZpZXdTdGF0ZXNCeUFkZHJlc3NlcyhuYXZTdGF0ZS52aXNpYmxlVmlld1N0YXRlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIHByb2Nlc3NJbnRlbnQoaW50ZW50OiBJSW50ZW50LCB1cmw6IHN0cmluZyB8IG51bGwgPSBudWxsKTogdm9pZCB7XHJcbiAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMuZ2V0Vmlld1N0YXRlQnlJbnRlbnQoaW50ZW50KTtcclxuICAgIGlmIChjdXJyZW50Vmlldykge1xyXG4gICAgICBpZiAoY3VycmVudFZpZXcudmlld1R5cGVJbmZvLnJlcXVpcmUuaW5kZXhPZihcImdsb2JhbC5zdGFja1wiKSA9PT0gLTEpIHtcclxuICAgICAgICB0aGlzLmhpZGVBbGwoKTtcclxuICAgICAgfVxyXG4gICAgICBjdXJyZW50VmlldyAmJiBjdXJyZW50Vmlldy5zaG93KHRydWUpO1xyXG4gICAgfVxyXG4gICAgV2luZG93SGlzdG9yeUhlbHBlci5zZXRDdXJyZW50U3RhdGVWaWV3QWRkcmVzc2VzKHRoaXMuZ2V0VmlzaWJsZVZpZXdTdGF0ZUFkZHJlc3NlcygpKTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gcHVibGljIG5vdGlmeSgpIHtcclxuICAgIHRoaXMudmVyc2lvbisrO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBWaWV3SW50ZW50U3RhdGUuSW5zdGFuY2U7XHJcbiJdfQ==
