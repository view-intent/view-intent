"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var ViewTypeStore;
(function (ViewTypeStore) {
    var store = {};
    function registerViewType(viewInfo) {
        // console.log(viewInfo);
        var storeName = helper_1.Helper.getStoreName(viewInfo.area, viewInfo.name);
        if (typeof viewInfo.require === "string") {
            viewInfo.require = [viewInfo.require];
        }
        store[storeName] = {
            storeName: storeName,
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
        var viewTypeInfo = store[helper_1.Helper.getStoreName(areaName, typeName)];
        if (viewTypeInfo === null || viewTypeInfo === undefined) {
            console.error("The view #" + areaName + "." + typeName + " doesn't exist or wasn't registered.");
            viewTypeInfo = store[helper_1.Helper.getStoreName("default", "ViewNotFound")];
        }
        return viewTypeInfo;
        // return store[getStoreName(areaName, typeName)];
    }
    ViewTypeStore.getViewTypeInfo = getViewTypeInfo;
})(ViewTypeStore = exports.ViewTypeStore || (exports.ViewTypeStore = {}));
//# sourceMappingURL=view-type-store.js.map