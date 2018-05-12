"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const generic_1 = require("./generic");
const class_transformer_1 = require("class-transformer");
// import { Skip } from "serializer.ts/Decorators";
let RootStore = class RootStore extends generic_1.Generic {
};
RootStore = __decorate([
    class_transformer_1.Exclude()
], RootStore);
exports.RootStore = RootStore;
exports.default = RootStore;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2J4L3Jvb3Qtc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSx1Q0FBb0M7QUFDcEMseURBQTRDO0FBQzVDLG1EQUFtRDtBQUduRCxJQUFzQixTQUFTLEdBQS9CLGVBQWdDLFNBQVEsaUJBQU87Q0FJOUMsQ0FBQTtBQUpxQixTQUFTO0lBRDlCLDJCQUFPLEVBQUU7R0FDWSxTQUFTLENBSTlCO0FBSnFCLDhCQUFTO0FBSy9CLGtCQUFlLFNBQVMsQ0FBQyIsImZpbGUiOiJtb2J4L3Jvb3Qtc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3Rpb24sIG9ic2VydmFibGUsIGNvbXB1dGVkLCBvYnNlcnZlLCBPYnNlcnZhYmxlTWFwIH0gZnJvbSBcIm1vYnhcIjtcclxuaW1wb3J0IHsgR2VuZXJpYyB9IGZyb20gXCIuL2dlbmVyaWNcIjtcclxuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xyXG4vLyBpbXBvcnQgeyBTa2lwIH0gZnJvbSBcInNlcmlhbGl6ZXIudHMvRGVjb3JhdG9yc1wiO1xyXG5cclxuQEV4Y2x1ZGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm9vdFN0b3JlIGV4dGVuZHMgR2VuZXJpYyB7XHJcbiAgW2tleTogc3RyaW5nXTogYW55O1xyXG4gIC8vIEBTa2lwKClcclxuICAvLyBwdWJsaWMgcm9vdFN0b3JlOiBSb290U3RvcmU7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgUm9vdFN0b3JlO1xyXG4iXX0=
