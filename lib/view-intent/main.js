"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("./view");
exports.View = view_1.View;
const view_type_store_1 = require("./view-type-store");
const nav_1 = require("./nav");
const helper_1 = require("./helper");
const view_error_1 = require("./view-error");
const state_root_1 = require("./state-root");
const view_root_1 = require("./view-root");
const data_fetch_1 = require("./data-fetch");
const utility_collection_1 = require("utility-collection");
const view_intent_dom_1 = require("./view-intent-dom");
const React = require("react");
exports.React = React;
const ReactDOM = require("react-dom");
exports.ReactDOM = ReactDOM;
const config_1 = require("../config/config");
var view_frame_1 = require("./view-frame");
exports.ViewFrame = view_frame_1.ViewFrame;
// export { IIntent, IViewInfo, IRootStore, IConfig } from "./types";
// export * from "./data-fetch";
// import { Main } from "../main";
// mobx.extras.isolateGlobalState();
var ViewIntent;
(function (ViewIntent) {
    function config(config) {
        // DataFetch.origin = config.origin;
        if (config.element !== undefined) {
            init(config.element);
        }
    }
    ViewIntent.config = config;
    ViewIntent.get = data_fetch_1.DataFetch.get;
    ViewIntent.post = data_fetch_1.DataFetch.post;
    ViewIntent.put = data_fetch_1.DataFetch.put;
    ViewIntent.patch = data_fetch_1.DataFetch.patch;
    ViewIntent.del = data_fetch_1.DataFetch.del;
    function intentView(intentOrUrl, viewState = null, callback = null) {
        const intent = helper_1.Helper.pathToIntent(intentOrUrl, viewState);
        const url = helper_1.Helper.removeSharp(intentOrUrl);
        if (!utility_collection_1.Is.empty(url)) {
            data_fetch_1.DataFetch.get(url, undefined);
        }
        if (intent != null) {
            nav_1.Nav.intentView(intent, url, callback);
        }
    }
    ViewIntent.intentView = intentView;
    // #endregion
    function back() {
        window.history.back();
    }
    ViewIntent.back = back;
    // #region
    function registerViewType(viewInfo) {
        if (viewInfo.area === undefined || viewInfo.area === null) {
            viewInfo.area = "global";
        }
        if (viewInfo.require === undefined || viewInfo.require === null) {
            viewInfo.require = [];
        }
        if (typeof viewInfo.require === "string") {
            viewInfo.require = [viewInfo.require];
        }
        for (let i = 0; i < viewInfo.require.length; i++) {
            if (viewInfo.require[i].indexOf("#") === 0) {
                viewInfo.require[i] = viewInfo.require[i].replace("#", "");
            }
            if (viewInfo.require[i].indexOf(".") < 0) {
                viewInfo.require[i] = "global." + viewInfo.require[i];
            }
        }
        view_type_store_1.ViewTypeStore.registerViewType(viewInfo);
    }
    ViewIntent.registerViewType = registerViewType;
    function init(element, intent = null, hotLoader = true) {
        view_root_1.ViewRoot.htmlInit(intent, element, hotLoader);
        nav_1.Nav.start(intent);
        data_fetch_1.DataFetch.get(window.location.href);
        view_intent_dom_1.ViewIntentDom.init();
        window.addEventListener("popstate", (e) => {
            nav_1.Nav.intentViewPop(e.state);
            // DataFetch.get(window.location.href); // best without
        });
    }
    function registerRootStore(stateName, stateRootInstance) {
        return state_root_1.RootStore.registerRootStore(stateName, stateRootInstance);
    }
    ViewIntent.registerRootStore = registerRootStore;
    function getRootStore(stateName, stateRootClass) {
        if (state_root_1.RootStore.getRootStore(stateName) !== undefined && state_root_1.RootStore.getRootStore(stateName) !== null) {
            return state_root_1.RootStore.getRootStore(stateName);
        }
        else {
            if (stateRootClass !== undefined) {
                return state_root_1.RootStore.registerRootStore(stateName, new stateRootClass());
            }
        }
    }
    ViewIntent.getRootStore = getRootStore;
})(ViewIntent = exports.ViewIntent || (exports.ViewIntent = {}));
ViewIntent.registerViewType(view_error_1.ViewNotFound.viewInfo);
requestAnimationFrame(() => {
    if (config_1.Config.options.element !== null && config_1.Config.options.element !== undefined) {
        ViewIntent.config(config_1.Config.options);
    }
});
exports.default = ViewIntent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsaUNBQThCO0FBZ0JyQixlQWhCQSxXQUFJLENBZ0JBO0FBZGIsdURBQWtEO0FBQ2xELCtCQUE0QjtBQUM1QixxQ0FBa0M7QUFDbEMsNkNBQTRDO0FBQzVDLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsNkNBQXlDO0FBQ3pDLDJEQUF3QztBQUN4Qyx1REFBa0Q7QUFDbEQsK0JBQStCO0FBSXRCLHNCQUFLO0FBSGQsc0NBQXNDO0FBR3RCLDRCQUFRO0FBRnhCLDZDQUEwRDtBQUkxRCwyQ0FBeUM7QUFBaEMsaUNBQUEsU0FBUyxDQUFBO0FBRWxCLHFFQUFxRTtBQUNyRSxnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBRWxDLG9DQUFvQztBQUNwQyxJQUFpQixVQUFVLENBNEUxQjtBQTVFRCxXQUFpQixVQUFVO0lBQ3pCLGdCQUF1QixNQUFzQjtRQUMzQyxvQ0FBb0M7UUFDcEMsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUxlLGlCQUFNLFNBS3JCLENBQUE7SUFDWSxjQUFHLEdBQUcsc0JBQVMsQ0FBQyxHQUFHLENBQUM7SUFDcEIsZUFBSSxHQUFHLHNCQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3RCLGNBQUcsR0FBRyxzQkFBUyxDQUFDLEdBQUcsQ0FBQztJQUNwQixnQkFBSyxHQUFHLHNCQUFTLENBQUMsS0FBSyxDQUFDO0lBQ3hCLGNBQUcsR0FBRyxzQkFBUyxDQUFDLEdBQUcsQ0FBQztJQU9qQyxvQkFBMkIsV0FBNkIsRUFBRSxZQUFpQixJQUFJLEVBQUUsV0FBeUMsSUFBSTtRQUM1SCxNQUFNLE1BQU0sR0FBWSxlQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRSxNQUFNLEdBQUcsR0FBa0IsZUFB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LFNBQWlCLEVBQUUsY0FBb0I7UUFDckUsSUFBSSxzQkFBUyxDQUFDLFlBQVksQ0FBSSxTQUFTLENBQUMsS0FBSyxTQUFTLElBQUksc0JBQVMsQ0FBQyxZQUFZLENBQUksU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZHLE9BQU8sc0JBQVMsQ0FBQyxZQUFZLENBQUksU0FBUyxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNMLElBQUksY0FBYyxLQUFLLFNBQVMsRUFBRTtnQkFDaEMsT0FBTyxzQkFBUyxDQUFDLGlCQUFpQixDQUFJLFNBQVMsRUFBRSxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUM7YUFDeEU7U0FDRjtJQUNILENBQUM7SUFSZSx1QkFBWSxlQVEzQixDQUFBO0FBQ0gsQ0FBQyxFQTVFZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUE0RTFCO0FBQ0QsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkQscUJBQXFCLENBQUMsR0FBRyxFQUFFO0lBQ3pCLElBQUksZUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUMzRSxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0gsa0JBQWUsVUFBVSxDQUFDIiwiZmlsZSI6InZpZXctaW50ZW50L21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgKiBhcyBtb2J4IGZyb20gXCJtb2J4XCI7XHJcbmltcG9ydCB7IElJbnRlbnQsIElWaWV3SW5mbywgSVJvb3RTdG9yZSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XHJcbmltcG9ydCB7IFZpZXdJbnRlbnRTdGF0ZSwgVmlld1N0YXRlIH0gZnJvbSBcIi4vdmlldy1pbnRlbnQtc3RhdGVcIjtcclxuaW1wb3J0IHsgVmlld1R5cGVTdG9yZSB9IGZyb20gXCIuL3ZpZXctdHlwZS1zdG9yZVwiO1xyXG5pbXBvcnQgeyBOYXYgfSBmcm9tIFwiLi9uYXZcIjtcclxuaW1wb3J0IHsgSGVscGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XHJcbmltcG9ydCB7IFZpZXdOb3RGb3VuZCB9IGZyb20gXCIuL3ZpZXctZXJyb3JcIjtcclxuaW1wb3J0IHsgUm9vdFN0b3JlIH0gZnJvbSBcIi4vc3RhdGUtcm9vdFwiO1xyXG5pbXBvcnQgeyBWaWV3Um9vdCB9IGZyb20gXCIuL3ZpZXctcm9vdFwiO1xyXG5pbXBvcnQgeyBEYXRhRmV0Y2ggfSBmcm9tIFwiLi9kYXRhLWZldGNoXCI7XHJcbmltcG9ydCB7IElzIH0gZnJvbSBcInV0aWxpdHktY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3SW50ZW50RG9tIH0gZnJvbSBcIi4vdmlldy1pbnRlbnQtZG9tXCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IENvbmZpZywgSUNvbmZpZ09wdGlvbnMgfSBmcm9tIFwiLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG4vLyBleHBvcnRcclxuZXhwb3J0IHsgUmVhY3QsIFJlYWN0RE9NIH07XHJcbmV4cG9ydCB7IFZpZXcgfTtcclxuZXhwb3J0IHsgVmlld0ZyYW1lIH0gZnJvbSBcIi4vdmlldy1mcmFtZVwiO1xyXG5leHBvcnQgeyBJSW50ZW50LCBJVmlld0luZm8sIElSb290U3RvcmUgfTtcclxuLy8gZXhwb3J0IHsgSUludGVudCwgSVZpZXdJbmZvLCBJUm9vdFN0b3JlLCBJQ29uZmlnIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuLy8gZXhwb3J0ICogZnJvbSBcIi4vZGF0YS1mZXRjaFwiO1xyXG4vLyBpbXBvcnQgeyBNYWluIH0gZnJvbSBcIi4uL21haW5cIjtcclxuXHJcbi8vIG1vYnguZXh0cmFzLmlzb2xhdGVHbG9iYWxTdGF0ZSgpO1xyXG5leHBvcnQgbmFtZXNwYWNlIFZpZXdJbnRlbnQge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBjb25maWcoY29uZmlnOiBJQ29uZmlnT3B0aW9ucykge1xyXG4gICAgLy8gRGF0YUZldGNoLm9yaWdpbiA9IGNvbmZpZy5vcmlnaW47XHJcbiAgICBpZiAoY29uZmlnLmVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpbml0KGNvbmZpZy5lbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcbiAgZXhwb3J0IGNvbnN0IGdldCA9IERhdGFGZXRjaC5nZXQ7XHJcbiAgZXhwb3J0IGNvbnN0IHBvc3QgPSBEYXRhRmV0Y2gucG9zdDtcclxuICBleHBvcnQgY29uc3QgcHV0ID0gRGF0YUZldGNoLnB1dDtcclxuICBleHBvcnQgY29uc3QgcGF0Y2ggPSBEYXRhRmV0Y2gucGF0Y2g7XHJcbiAgZXhwb3J0IGNvbnN0IGRlbCA9IERhdGFGZXRjaC5kZWw7XHJcbiAgLy8gYXJlYU5hbWUuQ2xhc3NOYW1lOntpZHxcIm5ld1wifFwibGFzdFwifVxyXG4gIC8vICNyZWdpb24gaW50ZW50Vmlld1xyXG4gIC8vIGV4cG9ydCBmdW5jdGlvbiBpbnRlbnRWaWV3KGludGVudDogSUludGVudCk6IHZvaWQ7XHJcbiAgLy8gZXhwb3J0IGZ1bmN0aW9uIGludGVudFZpZXcodXJsOiBzdHJpbmcpOiB2b2lkO1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBpbnRlbnRWaWV3KGludGVudDogSUludGVudCwgdmlld1N0YXRlPzogYW55LCBjYWxsYmFjaz86ICgoZGF0YTogYW55KSA9PiB2b2lkKSB8IG51bGwpOiB2b2lkO1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBpbnRlbnRWaWV3KHVybDogc3RyaW5nLCB2aWV3U3RhdGU/OiBhbnksIGNhbGxiYWNrPzogKChkYXRhOiBhbnkpID0+IHZvaWQpIHwgbnVsbCk6IHZvaWQ7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGludGVudFZpZXcoaW50ZW50T3JVcmw6IElJbnRlbnQgfCBzdHJpbmcsIHZpZXdTdGF0ZTogYW55ID0gbnVsbCwgY2FsbGJhY2s6ICgoZGF0YTogYW55KSA9PiB2b2lkKSB8IG51bGwgPSBudWxsKTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnRlbnQ6IElJbnRlbnQgPSBIZWxwZXIucGF0aFRvSW50ZW50KGludGVudE9yVXJsLCB2aWV3U3RhdGUpO1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgfCBudWxsID0gSGVscGVyLnJlbW92ZVNoYXJwKGludGVudE9yVXJsKTtcclxuICAgIGlmICghSXMuZW1wdHkodXJsKSkge1xyXG4gICAgICBEYXRhRmV0Y2guZ2V0KHVybCEsIHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaW50ZW50ICE9IG51bGwpIHtcclxuICAgICAgTmF2LmludGVudFZpZXcoaW50ZW50LCB1cmwhLCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vICNlbmRyZWdpb25cclxuICBleHBvcnQgZnVuY3Rpb24gYmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbiAgLy8gI3JlZ2lvblxyXG4gIGV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclZpZXdUeXBlKHZpZXdJbmZvOiBJVmlld0luZm8pIHtcclxuICAgIGlmICh2aWV3SW5mby5hcmVhID09PSB1bmRlZmluZWQgfHwgdmlld0luZm8uYXJlYSA9PT0gbnVsbCkge1xyXG4gICAgICB2aWV3SW5mby5hcmVhID0gXCJnbG9iYWxcIjtcclxuICAgIH1cclxuICAgIGlmICh2aWV3SW5mby5yZXF1aXJlID09PSB1bmRlZmluZWQgfHwgdmlld0luZm8ucmVxdWlyZSA9PT0gbnVsbCkge1xyXG4gICAgICB2aWV3SW5mby5yZXF1aXJlID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHZpZXdJbmZvLnJlcXVpcmUgPT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgIHZpZXdJbmZvLnJlcXVpcmUgPSBbdmlld0luZm8ucmVxdWlyZV07XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXdJbmZvLnJlcXVpcmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHZpZXdJbmZvLnJlcXVpcmVbaV0uaW5kZXhPZihcIiNcIikgPT09IDApIHtcclxuICAgICAgICB2aWV3SW5mby5yZXF1aXJlW2ldID0gdmlld0luZm8ucmVxdWlyZVtpXS5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmlld0luZm8ucmVxdWlyZVtpXS5pbmRleE9mKFwiLlwiKSA8IDApIHtcclxuICAgICAgICB2aWV3SW5mby5yZXF1aXJlW2ldID0gXCJnbG9iYWwuXCIgKyB2aWV3SW5mby5yZXF1aXJlW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBWaWV3VHlwZVN0b3JlLnJlZ2lzdGVyVmlld1R5cGUodmlld0luZm8pO1xyXG4gIH1cclxuICBmdW5jdGlvbiBpbml0KGVsZW1lbnQ6IHN0cmluZyB8IEhUTUxFbGVtZW50KTogdm9pZDtcclxuICBmdW5jdGlvbiBpbml0KGVsZW1lbnQ6IHN0cmluZyB8IEhUTUxFbGVtZW50LCBpbnRlbnQ6IElJbnRlbnQgfCBudWxsID0gbnVsbCwgaG90TG9hZGVyOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgVmlld1Jvb3QuaHRtbEluaXQoaW50ZW50ISwgZWxlbWVudCwgaG90TG9hZGVyKTtcclxuICAgIE5hdi5zdGFydChpbnRlbnQpO1xyXG4gICAgRGF0YUZldGNoLmdldCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBWaWV3SW50ZW50RG9tLmluaXQoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgKGUpID0+IHtcclxuICAgICAgTmF2LmludGVudFZpZXdQb3AoZS5zdGF0ZSk7XHJcbiAgICAgIC8vIERhdGFGZXRjaC5nZXQod2luZG93LmxvY2F0aW9uLmhyZWYpOyAvLyBiZXN0IHdpdGhvdXRcclxuICAgIH0pO1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJSb290U3RvcmU8VD4oc3RhdGVOYW1lOiBzdHJpbmcsIHN0YXRlUm9vdEluc3RhbmNlOiBUKTogVCB7XHJcbiAgICByZXR1cm4gUm9vdFN0b3JlLnJlZ2lzdGVyUm9vdFN0b3JlPFQ+KHN0YXRlTmFtZSwgc3RhdGVSb290SW5zdGFuY2UpO1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gZ2V0Um9vdFN0b3JlPFQ+KHN0YXRlTmFtZTogc3RyaW5nLCBzdGF0ZVJvb3RDbGFzcz86IGFueSk6IFQgfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKFJvb3RTdG9yZS5nZXRSb290U3RvcmU8VD4oc3RhdGVOYW1lKSAhPT0gdW5kZWZpbmVkICYmIFJvb3RTdG9yZS5nZXRSb290U3RvcmU8VD4oc3RhdGVOYW1lKSAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gUm9vdFN0b3JlLmdldFJvb3RTdG9yZTxUPihzdGF0ZU5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHN0YXRlUm9vdENsYXNzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gUm9vdFN0b3JlLnJlZ2lzdGVyUm9vdFN0b3JlPFQ+KHN0YXRlTmFtZSwgbmV3IHN0YXRlUm9vdENsYXNzKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblZpZXdJbnRlbnQucmVnaXN0ZXJWaWV3VHlwZShWaWV3Tm90Rm91bmQudmlld0luZm8pO1xyXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gIGlmIChDb25maWcub3B0aW9ucy5lbGVtZW50ICE9PSBudWxsICYmIENvbmZpZy5vcHRpb25zLmVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgVmlld0ludGVudC5jb25maWcoQ29uZmlnLm9wdGlvbnMpO1xyXG4gIH1cclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IFZpZXdJbnRlbnQ7XHJcbiJdfQ==
