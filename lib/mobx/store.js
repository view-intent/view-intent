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
const mobx_1 = require("mobx");
const class_transformer_1 = require("class-transformer");
const generic_1 = require("./generic");
class Store extends generic_1.Generic {
    // @observable public viUpVersion: number = 0;
    constructor(rootStore) {
        super(rootStore);
        this.setParent = this.setParent.bind(this);
        this.setParent(rootStore);
    }
    setParent(rootStore) {
        super.setParent(rootStore);
        this.rootStore = rootStore;
    }
}
__decorate([
    class_transformer_1.Exclude(),
    mobx_1.observable,
    __metadata("design:type", Object)
], Store.prototype, "rootStore", void 0);
exports.Store = Store;
exports.default = Store;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2J4L3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0JBQTRFO0FBRTVFLHlEQUE0QztBQUU1Qyx1Q0FBb0M7QUFFcEMsV0FBK0IsU0FBUSxpQkFBTztJQUs1Qyw4Q0FBOEM7SUFDOUMsWUFBbUIsU0FBcUI7UUFDdEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ00sU0FBUyxDQUFDLFNBQWM7UUFDN0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0NBV0Y7QUFyQmE7SUFEWCwyQkFBTyxFQUFFO0lBQ1QsaUJBQVU7O3dDQUF5QztBQUp0RCxzQkF5QkM7QUFDRCxrQkFBZSxLQUFLLENBQUMiLCJmaWxlIjoibW9ieC9zdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFjdGlvbiwgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIG9ic2VydmUsIE9ic2VydmFibGVNYXAgfSBmcm9tIFwibW9ieFwiO1xyXG5pbXBvcnQgeyBSb290U3RvcmUgfSBmcm9tIFwiLi9tYWluXCI7XHJcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tIFwiY2xhc3MtdHJhbnNmb3JtZXJcIjtcclxuaW1wb3J0IHsgSXMgfSBmcm9tIFwidXRpbGl0eS1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IEdlbmVyaWMgfSBmcm9tIFwiLi9nZW5lcmljXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmU8VD4gZXh0ZW5kcyBHZW5lcmljIHtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gIEBFeGNsdWRlKClcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgcm9vdFN0b3JlOiBSb290U3RvcmUgfCB1bmRlZmluZWQ7XHJcbiAgLy8gQG9ic2VydmFibGUgcHVibGljIHZpVXBWZXJzaW9uOiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb290U3RvcmU/OiBSb290U3RvcmUpIHtcclxuICAgIHN1cGVyKHJvb3RTdG9yZSk7XHJcbiAgICB0aGlzLnNldFBhcmVudCA9IHRoaXMuc2V0UGFyZW50LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnNldFBhcmVudChyb290U3RvcmUpO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0UGFyZW50KHJvb3RTdG9yZTogYW55KTogdm9pZCB7XHJcbiAgICBzdXBlci5zZXRQYXJlbnQocm9vdFN0b3JlKTtcclxuICAgIHRoaXMucm9vdFN0b3JlID0gcm9vdFN0b3JlO1xyXG4gIH1cclxuXHJcbiAgLy8gQGFjdGlvbiBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gIC8vIFx0dGhpcy52aXVwdmVyc2lvbisrO1xyXG4gIC8vIFx0aWYgKCFJcy5udWxsT3JVbmRlZmluZWQoIHRoaXMucm9vdFN0b3JlKSkge1xyXG4gIC8vIFx0XHR0aGlzLnJvb3RTdG9yZS51cGRhdGUoKTtcclxuICAvLyBcdH1cclxuICAvLyBcdGlmICghSXMubnVsbE9yVW5kZWZpbmVkKCB0aGlzLnZpUGFyZW50KSkge1xyXG4gIC8vIFx0XHR0aGlzLnZpUGFyZW50LnVwZGF0ZSgpO1xyXG4gIC8vIFx0fVxyXG4gIC8vIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcclxuIl19
