"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_collection_1 = require("utility-collection");
var Helper;
(function (Helper) {
    function toUrlDataIntent(url) {
        var dataIntent = {
            url: url,
            intentUrl: null,
            intent: null,
        };
        if (url !== null && url !== undefined) {
            if (url.indexOf("#") > -1) {
                var splited = url.split("#");
                if (isViewIntentPath(splited[1])) {
                    dataIntent.intentUrl = splited[1];
                    dataIntent.intent = pathToIntent(dataIntent.intentUrl);
                    dataIntent.url = splited[0];
                    if (dataIntent.url === "") {
                        dataIntent.url = null;
                    }
                }
            }
        }
        return dataIntent;
    }
    Helper.toUrlDataIntent = toUrlDataIntent;
    function isViewIntentUrl(url) {
        if (utility_collection_1.Is.nullOrUndefined(url)) {
            return false;
        }
        var splited = url.split("#");
        if (splited.length < 2) {
            return false;
        }
        else {
            var viewIntentPath = splited[1];
            if (isViewIntentPath(viewIntentPath)) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    Helper.isViewIntentUrl = isViewIntentUrl;
    function isViewIntentPath(path) {
        return true;
        // const pathArray = path.split(".");
        // if (pathArray.length === 2) {
        //   return true;
        // } else {
        //     return false;
        // }
    }
    Helper.isViewIntentPath = isViewIntentPath;
    var dashRegExp = new RegExp("-", "g");
    function getStoreName(areaName, typeName) {
        areaName = areaName.replace(dashRegExp, "");
        typeName = typeName.replace(dashRegExp, "");
        return (areaName + "." + typeName).toLowerCase();
    }
    Helper.getStoreName = getStoreName;
    function navStateToIntent(navIntent) {
        var newIntent = {
            areaName: navIntent.areaName,
            viewType: navIntent.viewType,
            instanceId: navIntent.instanceId,
            viewState: navIntent.viewState,
        };
        return newIntent;
    }
    Helper.navStateToIntent = navStateToIntent;
    function intentToViewInstanceAddress(intent) {
        return intent.areaName + "." + intent.viewType + ":" + intent.instanceId;
    }
    Helper.intentToViewInstanceAddress = intentToViewInstanceAddress;
    function getViewInstanceAddress(areaName, viewType, instanceId) {
        return (this.areaName + "." + this.viewType + ":" + this.instanceId).toLowerCase();
    }
    Helper.getViewInstanceAddress = getViewInstanceAddress;
    function pathToIntent(intentOrUrl, viewState) {
        if (viewState === void 0) { viewState = null; }
        if (intentOrUrl === null || intentOrUrl === undefined) {
            return null;
        }
        var newIntent;
        if (typeof intentOrUrl === "string") {
            var intentPath = intentOrUrl;
            if (intentOrUrl.indexOf("#") > -1) {
                intentPath = intentOrUrl.split("#")[1];
            }
            if (intentPath.indexOf("/") > -1) {
                return null;
            }
            var pathArray = intentPath.split(".");
            var areaName = void 0;
            var viewType = void 0;
            var instanceId = "last";
            // let instanceType: InstanceTypeProtocol = InstanceTypeProtocol.lastInstance;
            // -------------------
            if (pathArray.length < 2) {
                return pathToIntent(intentOrUrl.replace("#", "#global."), viewState);
            }
            else {
                var TypePathArray = pathArray[1].split(":");
                if (TypePathArray.length > 1) {
                    instanceId = TypePathArray[1].toLowerCase();
                }
                else {
                    instanceId = "last";
                }
                areaName = pathArray[0].toLowerCase();
                viewType = TypePathArray[0].toLowerCase();
            }
            // -------------------
            newIntent = {
                areaName: areaName,
                instanceId: instanceId,
                viewType: viewType,
                viewState: viewState,
            };
            return newIntent;
        }
        else {
            newIntent = intentOrUrl;
            if (viewState !== null && viewState !== undefined) {
                newIntent.viewState = viewState;
            }
        }
        return newIntent;
    }
    Helper.pathToIntent = pathToIntent;
    function removeSharp(url) {
        if (typeof url === "string") {
            if (url.indexOf("#") > -1) {
                return url.split("#")[0];
            }
            else {
                return url;
            }
        }
        else {
            return null;
        }
    }
    Helper.removeSharp = removeSharp;
})(Helper = exports.Helper || (exports.Helper = {}));
exports.default = Helper;
//# sourceMappingURL=helper.js.map