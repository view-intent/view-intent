"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_collection_1 = require("utility-collection");
var Helper;
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
        if (utility_collection_1.Is.nullOrUndefined(url)) {
            return false;
        }
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
        return true;
        // const pathArray = path.split(".");
        // if (pathArray.length === 2) {
        //   return true;
        // } else {
        //     return false;
        // }
    }
    Helper.isViewIntentPath = isViewIntentPath;
    const dashRegExp = new RegExp("-", "g");
    function getStoreName(areaName, typeName) {
        areaName = areaName.replace(dashRegExp, "");
        typeName = typeName.replace(dashRegExp, "");
        return (areaName + "." + typeName).toLowerCase();
    }
    Helper.getStoreName = getStoreName;
    function navStateToIntent(navIntent) {
        const newIntent = {
            areaName: navIntent.areaName,
            viewType: navIntent.viewType,
            instanceId: navIntent.instanceId,
            viewState: navIntent.viewState,
        };
        return newIntent;
    }
    Helper.navStateToIntent = navStateToIntent;
    function intentToViewInstanceAddress(intent) {
        return `${intent.areaName}.${intent.viewType}:${intent.instanceId}`;
    }
    Helper.intentToViewInstanceAddress = intentToViewInstanceAddress;
    function getViewInstanceAddress(areaName, viewType, instanceId) {
        return (`${this.areaName}.${this.viewType}:${this.instanceId}`).toLowerCase();
    }
    Helper.getViewInstanceAddress = getViewInstanceAddress;
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
                return pathToIntent(intentOrUrl.replace("#", "#global."), viewState);
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
})(Helper = exports.Helper || (exports.Helper = {}));
exports.default = Helper;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyREFBd0M7QUFFeEMsSUFBaUIsTUFBTSxDQW1JdEI7QUFuSUQsV0FBaUIsTUFBTTtJQUNyQix5QkFBZ0MsR0FBa0I7UUFDaEQsTUFBTSxVQUFVLEdBQW1CO1lBQ2pDLEdBQUc7WUFDSCxTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUNGLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3JDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDekIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDaEMsVUFBVSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkQsVUFBVSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLElBQUksVUFBVSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUU7d0JBQ3pCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO3FCQUN2QjtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBcEJlLHNCQUFlLGtCQW9COUIsQ0FBQTtJQUNELHlCQUFnQyxHQUFXO1FBQ3pDLElBQUksdUJBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FB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QyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDekIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFDO2FBQ1o7U0FDRjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFWZSxrQkFBVyxjQVUxQixDQUFBO0FBQ0gsQ0FBQyxFQW5JZ0IsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBbUl0QjtBQUNELGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJ2aWV3LWludGVudC9oZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJSW50ZW50LCBJVXJsRGF0YUludGVudCwgSU5hdlN0YXRlIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgSXMgfSBmcm9tIFwidXRpbGl0eS1jb2xsZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIEhlbHBlciB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHRvVXJsRGF0YUludGVudCh1cmw6IHN0cmluZyB8IG51bGwpOiBJVXJsRGF0YUludGVudCB7XHJcbiAgICBjb25zdCBkYXRhSW50ZW50OiBJVXJsRGF0YUludGVudCA9IHtcclxuICAgICAgdXJsLFxyXG4gICAgICBpbnRlbnRVcmw6IG51bGwsXHJcbiAgICAgIGludGVudDogbnVsbCxcclxuICAgIH07XHJcbiAgICBpZiAodXJsICE9PSBudWxsICYmIHVybCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh1cmwuaW5kZXhPZihcIiNcIikgPiAtMSkge1xyXG4gICAgICAgIGNvbnN0IHNwbGl0ZWQgPSB1cmwuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIGlmIChpc1ZpZXdJbnRlbnRQYXRoKHNwbGl0ZWRbMV0pKSB7XHJcbiAgICAgICAgICBkYXRhSW50ZW50LmludGVudFVybCA9IHNwbGl0ZWRbMV07XHJcbiAgICAgICAgICBkYXRhSW50ZW50LmludGVudCA9IHBhdGhUb0ludGVudChkYXRhSW50ZW50LmludGVudFVybCk7XHJcbiAgICAgICAgICBkYXRhSW50ZW50LnVybCA9IHNwbGl0ZWRbMF07XHJcbiAgICAgICAgICBpZiAoZGF0YUludGVudC51cmwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgZGF0YUludGVudC51cmwgPSBudWxsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGFJbnRlbnQ7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBpc1ZpZXdJbnRlbnRVcmwodXJsOiBzdHJpbmcpIHtcclxuICAgIGlmIChJcy5udWxsT3JVbmRlZmluZWQodXJsKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzcGxpdGVkID0gdXJsLnNwbGl0KFwiI1wiKTtcclxuICAgIGlmIChzcGxpdGVkLmxlbmd0aCA8IDIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgdmlld0ludGVudFBhdGg6IHN0cmluZyA9IHNwbGl0ZWRbMV07XHJcbiAgICAgIGlmIChpc1ZpZXdJbnRlbnRQYXRoKHZpZXdJbnRlbnRQYXRoKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gaXNWaWV3SW50ZW50UGF0aChwYXRoOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gICAgLy8gY29uc3QgcGF0aEFycmF5ID0gcGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICAvLyBpZiAocGF0aEFycmF5Lmxlbmd0aCA9PT0gMikge1xyXG4gICAgLy8gICByZXR1cm4gdHJ1ZTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuICBjb25zdCBkYXNoUmVnRXhwID0gbmV3IFJlZ0V4cChcIi1cIiwgXCJnXCIpO1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yZU5hbWUoYXJlYU5hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBhcmVhTmFtZSA9IGFyZWFOYW1lLnJlcGxhY2UoZGFzaFJlZ0V4cCwgXCJcIik7XHJcbiAgICB0eXBlTmFtZSA9IHR5cGVOYW1lLnJlcGxhY2UoZGFzaFJlZ0V4cCwgXCJcIik7XHJcbiAgICByZXR1cm4gKGFyZWFOYW1lICsgXCIuXCIgKyB0eXBlTmFtZSkudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIG5hdlN0YXRlVG9JbnRlbnQobmF2SW50ZW50OiBJTmF2U3RhdGUpOiBJSW50ZW50IHtcclxuICAgIGNvbnN0IG5ld0ludGVudDogSUludGVudCA9IHtcclxuICAgICAgYXJlYU5hbWU6IG5hdkludGVudC5hcmVhTmFtZSxcclxuICAgICAgdmlld1R5cGU6IG5hdkludGVudC52aWV3VHlwZSxcclxuICAgICAgaW5zdGFuY2VJZDogbmF2SW50ZW50Lmluc3RhbmNlSWQsXHJcbiAgICAgIHZpZXdTdGF0ZTogbmF2SW50ZW50LnZpZXdTdGF0ZSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3SW50ZW50O1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gaW50ZW50VG9WaWV3SW5zdGFuY2VBZGRyZXNzKGludGVudDogSUludGVudCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCR7aW50ZW50LmFyZWFOYW1lfS4ke2ludGVudC52aWV3VHlwZX06JHtpbnRlbnQuaW5zdGFuY2VJZH1gO1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gZ2V0Vmlld0luc3RhbmNlQWRkcmVzcyhhcmVhTmFtZTogc3RyaW5nLCB2aWV3VHlwZTogc3RyaW5nLCBpbnN0YW5jZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChgJHt0aGlzLmFyZWFOYW1lfS4ke3RoaXMudmlld1R5cGV9OiR7dGhpcy5pbnN0YW5jZUlkfWApLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXRoVG9JbnRlbnQodXJsOiBzdHJpbmcpOiBJSW50ZW50O1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXRoVG9JbnRlbnQodXJsOiBzdHJpbmcsIHZpZXdTdGF0ZTogYW55KTogSUludGVudDtcclxuICBleHBvcnQgZnVuY3Rpb24gcGF0aFRvSW50ZW50KGludGVudDogSUludGVudCk6IElJbnRlbnQ7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHBhdGhUb0ludGVudChpbnRlbnQ6IElJbnRlbnQsIHZpZXdTdGF0ZTogYW55KTogSUludGVudDtcclxuICBleHBvcnQgZnVuY3Rpb24gcGF0aFRvSW50ZW50KGludGVudE9yVXJsOiBJSW50ZW50IHwgc3RyaW5nLCB2aWV3U3RhdGU6IGFueSk6IElJbnRlbnQ7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHBhdGhUb0ludGVudChpbnRlbnRPclVybDogSUludGVudCB8IHN0cmluZywgdmlld1N0YXRlOiBhbnkgPSBudWxsKTogSUludGVudCB8IG51bGwge1xyXG4gICAgaWYgKGludGVudE9yVXJsID09PSBudWxsIHx8IGludGVudE9yVXJsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3SW50ZW50OiBJSW50ZW50O1xyXG4gICAgaWYgKHR5cGVvZiBpbnRlbnRPclVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBsZXQgaW50ZW50UGF0aDogc3RyaW5nID0gaW50ZW50T3JVcmw7XHJcbiAgICAgIGlmIChpbnRlbnRPclVybC5pbmRleE9mKFwiI1wiKSA+IC0xKSB7XHJcbiAgICAgICAgaW50ZW50UGF0aCA9IGludGVudE9yVXJsLnNwbGl0KFwiI1wiKVsxXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaW50ZW50UGF0aC5pbmRleE9mKFwiL1wiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGF0aEFycmF5ID0gaW50ZW50UGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICAgIGxldCBhcmVhTmFtZTogc3RyaW5nO1xyXG4gICAgICBsZXQgdmlld1R5cGU6IHN0cmluZztcclxuICAgICAgbGV0IGluc3RhbmNlSWQ6IFwibGFzdFwiIHwgXCJuZXdcIiB8IHN0cmluZyA9IFwibGFzdFwiO1xyXG4gICAgICAvLyBsZXQgaW5zdGFuY2VUeXBlOiBJbnN0YW5jZVR5cGVQcm90b2NvbCA9IEluc3RhbmNlVHlwZVByb3RvY29sLmxhc3RJbnN0YW5jZTtcclxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICBpZiAocGF0aEFycmF5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICByZXR1cm4gcGF0aFRvSW50ZW50KGludGVudE9yVXJsLnJlcGxhY2UoXCIjXCIsIFwiI2dsb2JhbC5cIiksIHZpZXdTdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgVHlwZVBhdGhBcnJheTogc3RyaW5nW10gPSBwYXRoQXJyYXlbMV0uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgIGlmIChUeXBlUGF0aEFycmF5Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIGluc3RhbmNlSWQgPSBUeXBlUGF0aEFycmF5WzFdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGluc3RhbmNlSWQgPSBcImxhc3RcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJlYU5hbWUgPSBwYXRoQXJyYXlbMF0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB2aWV3VHlwZSA9IFR5cGVQYXRoQXJyYXlbMF0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgfVxyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIG5ld0ludGVudCA9IHtcclxuICAgICAgICBhcmVhTmFtZSxcclxuICAgICAgICBpbnN0YW5jZUlkLFxyXG4gICAgICAgIHZpZXdUeXBlLFxyXG4gICAgICAgIHZpZXdTdGF0ZSxcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIG5ld0ludGVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ld0ludGVudCA9IGludGVudE9yVXJsIGFzIElJbnRlbnQ7XHJcbiAgICAgIGlmICh2aWV3U3RhdGUgIT09IG51bGwgJiYgdmlld1N0YXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBuZXdJbnRlbnQudmlld1N0YXRlID0gdmlld1N0YXRlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3SW50ZW50O1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlU2hhcnAodXJsOiBzdHJpbmcgfCBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGlmICh1cmwuaW5kZXhPZihcIiNcIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybiB1cmwuc3BsaXQoXCIjXCIpWzBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBIZWxwZXI7XHJcbiJdfQ==
