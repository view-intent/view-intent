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
const utility_collection_1 = require("utility-collection");
const class_transformer_1 = require("class-transformer");
const lodash_1 = require("lodash");
class Generic {
    constructor(parent = null) {
        this.viParent = null;
        // @Exclude()
        this.viUpVersion = 0;
        this.updateSchedule = false;
        this.update = this.update.bind(this);
        this.setParent = this.setParent.bind(this);
        this.setParent(parent);
        mobx_1.observe(this, () => {
            this.update();
        });
    }
    setParent(parent) {
        this.viParent = parent;
    }
    toObject(exclude = []) {
        const newThis = lodash_1.cloneDeep(mobx_1.toJS(this));
        delete newThis.rootStore;
        delete newThis.viParent;
        delete newThis.setParent;
        // delete newThis.update;
        delete newThis.viUpVersion;
        for (const key in newThis) {
            if (newThis.hasOwnProperty(key)) {
                const prop = newThis[key];
                if (prop.hasOwnProperty("toObject")) {
                    newThis[key] = newThis[key].toObject(exclude);
                }
                else if (typeof prop === "function") {
                    delete newThis[key];
                }
            }
        }
        exclude.forEach((key) => {
            delete newThis[key];
        });
        const simpleObj = class_transformer_1.classToPlainFromExist({}, newThis, { enableCircularCheck: true });
        return simpleObj;
    }
    setField(fieldName, value) {
        this[fieldName] = value;
    }
    update(level = 0) {
        if (!this.updateSchedule) {
            this.updateSchedule = true;
            setImmediate(() => {
                this.viUpVersion = this.viUpVersion + 1;
                if (!utility_collection_1.Is.nullOrUndefined(this.viParent) && level < 20) {
                    level = level + 1;
                    // console.log("update", level);
                    this.viParent.update(level);
                }
                this.updateSchedule = false;
            });
        }
    }
}
__decorate([
    class_transformer_1.Exclude(),
    mobx_1.observable,
    __metadata("design:type", Object)
], Generic.prototype, "viParent", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], Generic.prototype, "viUpVersion", void 0);
__decorate([
    class_transformer_1.Exclude(),
    __metadata("design:type", Boolean)
], Generic.prototype, "updateSchedule", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], Generic.prototype, "setField", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Generic.prototype, "update", null);
exports.Generic = Generic;
exports.default = Generic;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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O29CQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7Z0JBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FDRjtBQXhEYTtJQURYLDJCQUFPLEVBQUU7SUFDVCxpQkFBVTs7eUNBQThCO0FBRTdCO0lBQVgsaUJBQVU7OzRDQUFpQztBQUU1QztJQURDLDJCQUFPLEVBQUU7OytDQUM4QjtBQW1DaEM7SUFBUCxhQUFNOzs7O3VDQUVOO0FBQ087SUFBUCxhQUFNOzs7O3FDQWFOO0FBMURILDBCQTJEQztBQUNELGtCQUFlLE9BQU8sQ0FBQyIsImZpbGUiOiJtb2J4L2dlbmVyaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3Rpb24sIG9ic2VydmFibGUsIGNvbXB1dGVkLCBvYnNlcnZlLCBPYnNlcnZhYmxlTWFwLCB0b0pTIH0gZnJvbSBcIm1vYnhcIjtcclxuaW1wb3J0IHsgUm9vdFN0b3JlIH0gZnJvbSBcIi4vbWFpblwiO1xyXG5pbXBvcnQgeyBJcywgUmVmbGVjdGlvbiB9IGZyb20gXCJ1dGlsaXR5LWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgRXhjbHVkZSwgY2xhc3NUb1BsYWluRnJvbUV4aXN0LCBUcmFuc2Zvcm1DbGFzc1RvUGxhaW4sIGNsYXNzVG9QbGFpbiB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xyXG5pbXBvcnQgeyBjbG9uZURlZXAsIGNsb25lIH0gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdlbmVyaWMge1xyXG4gIFtmaWVsZE5hbWU6IHN0cmluZ106IGFueTtcclxuICBARXhjbHVkZSgpXHJcbiAgQG9ic2VydmFibGUgcHVibGljIHZpUGFyZW50PzogYW55ID0gbnVsbDtcclxuICAvLyBARXhjbHVkZSgpXHJcbiAgQG9ic2VydmFibGUgcHJpdmF0ZSB2aVVwVmVyc2lvbjogbnVtYmVyID0gMDtcclxuICBARXhjbHVkZSgpXHJcbiAgcHJpdmF0ZSB1cGRhdGVTY2hlZHVsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnQ6IGFueSA9IG51bGwpIHtcclxuICAgIHRoaXMudXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuc2V0UGFyZW50ID0gdGhpcy5zZXRQYXJlbnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuc2V0UGFyZW50KHBhcmVudCk7XHJcbiAgICBvYnNlcnZlKHRoaXMsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0UGFyZW50KHBhcmVudDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnZpUGFyZW50ID0gcGFyZW50O1xyXG4gIH1cclxuICBwdWJsaWMgdG9PYmplY3QoZXhjbHVkZTogc3RyaW5nW10gPSBbXSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgY29uc3QgbmV3VGhpcyA9IGNsb25lRGVlcCh0b0pTKHRoaXMpKTtcclxuICAgIGRlbGV0ZSBuZXdUaGlzLnJvb3RTdG9yZTtcclxuICAgIGRlbGV0ZSBuZXdUaGlzLnZpUGFyZW50O1xyXG4gICAgZGVsZXRlIG5ld1RoaXMuc2V0UGFyZW50O1xyXG4gICAgLy8gZGVsZXRlIG5ld1RoaXMudXBkYXRlO1xyXG4gICAgZGVsZXRlIG5ld1RoaXMudmlVcFZlcnNpb247XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuZXdUaGlzKSB7XHJcbiAgICAgIGlmIChuZXdUaGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBjb25zdCBwcm9wID0gbmV3VGhpc1trZXldO1xyXG4gICAgICAgIGlmIChwcm9wLmhhc093blByb3BlcnR5KFwidG9PYmplY3RcIikpIHtcclxuICAgICAgICAgIG5ld1RoaXNba2V5XSA9IG5ld1RoaXNba2V5XS50b09iamVjdChleGNsdWRlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9wID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgIGRlbGV0ZSBuZXdUaGlzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBleGNsdWRlLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBkZWxldGUgbmV3VGhpc1trZXldO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBzaW1wbGVPYmogPSBjbGFzc1RvUGxhaW5Gcm9tRXhpc3Qoe30sIG5ld1RoaXMsIHsgZW5hYmxlQ2lyY3VsYXJDaGVjazogdHJ1ZSB9KTtcclxuICAgIHJldHVybiBzaW1wbGVPYmo7XHJcbiAgfVxyXG4gIEBhY3Rpb24gcHVibGljIHNldEZpZWxkKGZpZWxkTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzW2ZpZWxkTmFtZV0gPSB2YWx1ZTtcclxuICB9XHJcbiAgQGFjdGlvbiBwdWJsaWMgdXBkYXRlKGxldmVsOiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudXBkYXRlU2NoZWR1bGUpIHtcclxuICAgICAgdGhpcy51cGRhdGVTY2hlZHVsZSA9IHRydWU7XHJcbiAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy52aVVwVmVyc2lvbiA9IHRoaXMudmlVcFZlcnNpb24gKyAxO1xyXG4gICAgICAgIGlmICghSXMubnVsbE9yVW5kZWZpbmVkKHRoaXMudmlQYXJlbnQpICYmIGxldmVsIDwgMjApIHtcclxuICAgICAgICAgIGxldmVsID0gbGV2ZWwgKyAxO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ1cGRhdGVcIiwgbGV2ZWwpO1xyXG4gICAgICAgICAgdGhpcy52aVBhcmVudC51cGRhdGUobGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVNjaGVkdWxlID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBHZW5lcmljO1xyXG4iXX0=
