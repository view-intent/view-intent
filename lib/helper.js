export var Helper;
(function (Helper) {
    function toUrlDataIntent(url) {
        const dataIntent = {
            url,
            intentUrl: null,
            intent: null,
        };
        if (url !== null && url !== undefined) {
            if (url.indexOf("#") > -1) {
                const splited = url.split("#");
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
        const splited = url.split("#");
        if (splited.length < 2) {
            return false;
        }
        else {
            const viewIntentPath = splited[1];
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
        const pathArray = path.split(".");
        if (pathArray.length === 2) {
            return true;
        }
        else {
            return false;
        }
    }
    Helper.isViewIntentPath = isViewIntentPath;
    const dashRegExp = new RegExp("-", "g");
    function getStoreName(areaName, typeName) {
        areaName = areaName.replace(dashRegExp, "");
        typeName = typeName.replace(dashRegExp, "");
        return (areaName + "." + typeName).toLowerCase();
    }
    Helper.getStoreName = getStoreName;
    function pathToIntent(intentOrUrl, viewState = null) {
        if (intentOrUrl === null || intentOrUrl === undefined) {
            return null;
        }
        let newIntent;
        if (typeof intentOrUrl === "string") {
            let intentPath = intentOrUrl;
            if (intentOrUrl.indexOf("#") > -1) {
                intentPath = intentOrUrl.split("#")[1];
            }
            if (intentPath.indexOf("/") > -1) {
                return null;
            }
            const pathArray = intentPath.split(".");
            let areaName;
            let viewType;
            let instanceId = "last";
            // let instanceType: InstanceTypeProtocol = InstanceTypeProtocol.lastInstance;
            // -------------------
            if (pathArray.length < 2) {
                return null;
            }
            else {
                const TypePathArray = pathArray[1].split(":");
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
                areaName,
                instanceId,
                viewType,
                viewState,
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
})(Helper || (Helper = {}));
export default Helper;
//# sourceMappingURL=helper.js.map