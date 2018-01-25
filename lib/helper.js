"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helper;
(function (Helper) {
    function toUrlDataIntent(url, intentUrl) {
        if (intentUrl === void 0) { intentUrl = null; }
        var dataIntent = {
            url: url,
            intentUrl: null,
            intent: null,
        };
        if (url.indexOf("#") > -1) {
            var splited = url.split("#");
            if (isViewIntentPath(splited[1])) {
                dataIntent.intentUrl = splited[1];
                dataIntent.intent = pathToIntent(dataIntent.intentUrl);
                dataIntent.url = splited[0];
            }
        }
        return dataIntent;
    }
    Helper.toUrlDataIntent = toUrlDataIntent;
    function isViewIntentPath(path) {
        var pathArray = path.split(".");
        if (pathArray.length === 2) {
            return true;
        }
        else {
            return false;
        }
    }
    Helper.isViewIntentPath = isViewIntentPath;
    var dashRegExp = new RegExp("-", "g");
    function getStoreName(areaName, typeName) {
        areaName = areaName.replace(dashRegExp, "");
        typeName = typeName.replace(dashRegExp, "");
        return (areaName + "." + typeName).toLowerCase();
    }
    Helper.getStoreName = getStoreName;
    function pathToIntent(intent, viewState) {
        if (viewState === void 0) { viewState = null; }
        if (intent === null || intent === undefined) {
            return null;
        }
        var newIntent;
        if (typeof intent === "string") {
            var pathArray = intent.split(".");
            var areaName = void 0;
            var viewType = void 0;
            var instanceId = "last";
            // let instanceType: InstanceTypeProtocol = InstanceTypeProtocol.lastInstance;
            // -------------------
            if (pathArray.length < 2) {
                return null;
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
            newIntent = intent;
            if (viewState !== null && viewState !== undefined) {
                newIntent.viewState = viewState;
            }
            // if (newIntent.instanceId === null || newIntent.instanceId === undefined) {
            // 	newIntent.instanceId = "last";
            // }
        }
        return newIntent;
    }
    Helper.pathToIntent = pathToIntent;
})(Helper = exports.Helper || (exports.Helper = {}));
exports.default = Helper;
//# sourceMappingURL=helper.js.map