export var Helper;
(function (Helper) {
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
    function getStoreName(areaName, typeName) {
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
        }
        return newIntent;
    }
    Helper.pathToIntent = pathToIntent;
})(Helper || (Helper = {}));
export default Helper;
//# sourceMappingURL=helper.js.map