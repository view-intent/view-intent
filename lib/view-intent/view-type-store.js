"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
var ViewTypeStore;
(function (ViewTypeStore) {
    const store = {};
    function registerViewType(viewInfo) {
        // console.log(viewInfo);
        const storeName = helper_1.Helper.getStoreName(viewInfo.area, viewInfo.name);
        if (typeof viewInfo.require === "string") {
            viewInfo.require = [viewInfo.require];
        }
        store[storeName] = {
            storeName,
            areaName: viewInfo.area,
            typeName: viewInfo.name,
            viewType: viewInfo.type,
            frameId: viewInfo.frameId || "root",
            require: viewInfo.require || [],
        };
    }
    ViewTypeStore.registerViewType = registerViewType;
    function getViewTypeByStoreName(storeName) {
        if (storeName.indexOf(".") > -1) {
            return store[storeName.toLowerCase()].viewType;
        }
        else {
            throw new Error("Wrong storeName Type naming. Should be like this: (any-area-name.ViewType)");
        }
    }
    ViewTypeStore.getViewTypeByStoreName = getViewTypeByStoreName;
    function getViewType(areaName, typeName) {
        return getViewTypeInfo(areaName, typeName).viewType;
    }
    ViewTypeStore.getViewType = getViewType;
    function getViewTypeInfo(areaName, typeName) {
        let viewTypeInfo = store[helper_1.Helper.getStoreName(areaName, typeName)];
        if (viewTypeInfo === null || viewTypeInfo === undefined) {
            viewTypeInfo = store[helper_1.Helper.getStoreName("default", "ViewNotFound")];
        }
        return viewTypeInfo;
        // return store[getStoreName(areaName, typeName)];
    }
    ViewTypeStore.getViewTypeInfo = getViewTypeInfo;
})(ViewTypeStore = exports.ViewTypeStore || (exports.ViewTypeStore = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC92aWV3LXR5cGUtc3RvcmUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscUNBQWtDO0FBRWxDLElBQWlCLGFBQWEsQ0E0QzdCO0FBNUNELFdBQWlCLGFBQWE7SUFTNUIsTUFBTSxLQUFLLEdBQTJDLEVBQUUsQ0FBQztJQUV6RCwwQkFBaUMsUUFBbUI7UUFDbEQseUJBQXlCO1FBQ3pCLE1BQU0sU0FBUyxHQUFHLGVBQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLFFBQVEsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQ3hDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUc7WUFDakIsU0FBUztZQUNULFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSztZQUN4QixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ3ZCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxJQUFJLE1BQU07WUFDbkMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRTtTQUNoQyxDQUFDO0lBQ0osQ0FBQztJQWRlLDhCQUFnQixtQkFjL0IsQ0FBQTtJQUNELGdDQUF1QyxTQUFpQjtRQUN0RCxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO1NBQ2hEO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUM7U0FDL0Y7SUFDSCxDQUFDO0lBTmUsb0NBQXNCLHlCQU1yQyxDQUFBO0lBQ0QscUJBQTRCLFFBQWdCLEVBQUUsUUFBZ0I7UUFDNUQsT0FBTyxlQUFlLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0RCxDQUFDO0lBRmUseUJBQVcsY0FFMUIsQ0FBQTtJQUNELHlCQUFnQyxRQUFnQixFQUFFLFFBQWdCO1FBQ2hFLElBQUksWUFBWSxHQUFrQixLQUFLLENBQUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqRixJQUFJLFlBQVksS0FBSyxJQUFJLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUN2RCxZQUFZLEdBQUcsS0FBSyxDQUFDLGVBQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLFlBQVksQ0FBQztRQUNwQixrREFBa0Q7SUFDcEQsQ0FBQztJQVBlLDZCQUFlLGtCQU85QixDQUFBO0FBQ0gsQ0FBQyxFQTVDZ0IsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUE0QzdCIiwiZmlsZSI6InZpZXctaW50ZW50L3ZpZXctdHlwZS1zdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbnRlbnQsIElWaWV3SW5mbyB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXdcIjtcclxuaW1wb3J0IHsgSGVscGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFZpZXdUeXBlU3RvcmUge1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVZpZXdUeXBlSW5mbyB7XHJcbiAgICBzdG9yZU5hbWU6IHN0cmluZztcclxuICAgIGFyZWFOYW1lOiBzdHJpbmc7XHJcbiAgICB2aWV3VHlwZTogVmlldy5JVmlld0NvbnN0cnVjdG9yO1xyXG4gICAgdHlwZU5hbWU6IHN0cmluZztcclxuICAgIGZyYW1lSWQ6IHN0cmluZztcclxuICAgIHJlcXVpcmU6IHN0cmluZ1tdO1xyXG4gIH1cclxuICBjb25zdCBzdG9yZTogeyBbc3RvcmVOYW1lOiBzdHJpbmddOiBJVmlld1R5cGVJbmZvIH0gPSB7fTtcclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyVmlld1R5cGUodmlld0luZm86IElWaWV3SW5mbykge1xyXG4gICAgLy8gY29uc29sZS5sb2codmlld0luZm8pO1xyXG4gICAgY29uc3Qgc3RvcmVOYW1lID0gSGVscGVyLmdldFN0b3JlTmFtZSh2aWV3SW5mby5hcmVhISwgdmlld0luZm8ubmFtZSk7XHJcbiAgICBpZiAodHlwZW9mIHZpZXdJbmZvLnJlcXVpcmUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgdmlld0luZm8ucmVxdWlyZSA9IFt2aWV3SW5mby5yZXF1aXJlXTtcclxuICAgIH1cclxuICAgIHN0b3JlW3N0b3JlTmFtZV0gPSB7XHJcbiAgICAgIHN0b3JlTmFtZSxcclxuICAgICAgYXJlYU5hbWU6IHZpZXdJbmZvLmFyZWEhLFxyXG4gICAgICB0eXBlTmFtZTogdmlld0luZm8ubmFtZSxcclxuICAgICAgdmlld1R5cGU6IHZpZXdJbmZvLnR5cGUsXHJcbiAgICAgIGZyYW1lSWQ6IHZpZXdJbmZvLmZyYW1lSWQgfHwgXCJyb290XCIsXHJcbiAgICAgIHJlcXVpcmU6IHZpZXdJbmZvLnJlcXVpcmUgfHwgW10sXHJcbiAgICB9O1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gZ2V0Vmlld1R5cGVCeVN0b3JlTmFtZShzdG9yZU5hbWU6IHN0cmluZyk6IFZpZXcuSVZpZXdDb25zdHJ1Y3RvciB7XHJcbiAgICBpZiAoc3RvcmVOYW1lLmluZGV4T2YoXCIuXCIpID4gLTEpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlW3N0b3JlTmFtZS50b0xvd2VyQ2FzZSgpXS52aWV3VHlwZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHN0b3JlTmFtZSBUeXBlIG5hbWluZy4gU2hvdWxkIGJlIGxpa2UgdGhpczogKGFueS1hcmVhLW5hbWUuVmlld1R5cGUpXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gZ2V0Vmlld1R5cGUoYXJlYU5hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZyk6IFZpZXcuSVZpZXdDb25zdHJ1Y3RvciB7XHJcbiAgICByZXR1cm4gZ2V0Vmlld1R5cGVJbmZvKGFyZWFOYW1lLCB0eXBlTmFtZSkudmlld1R5cGU7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3VHlwZUluZm8oYXJlYU5hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZyk6IElWaWV3VHlwZUluZm8ge1xyXG4gICAgbGV0IHZpZXdUeXBlSW5mbzogSVZpZXdUeXBlSW5mbyA9IHN0b3JlW0hlbHBlci5nZXRTdG9yZU5hbWUoYXJlYU5hbWUsIHR5cGVOYW1lKV07XHJcbiAgICBpZiAodmlld1R5cGVJbmZvID09PSBudWxsIHx8IHZpZXdUeXBlSW5mbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHZpZXdUeXBlSW5mbyA9IHN0b3JlW0hlbHBlci5nZXRTdG9yZU5hbWUoXCJkZWZhdWx0XCIsIFwiVmlld05vdEZvdW5kXCIpXTtcclxuICAgIH1cclxuICAgIHJldHVybiB2aWV3VHlwZUluZm87XHJcbiAgICAvLyByZXR1cm4gc3RvcmVbZ2V0U3RvcmVOYW1lKGFyZWFOYW1lLCB0eXBlTmFtZSldO1xyXG4gIH1cclxufVxyXG4iXX0=
