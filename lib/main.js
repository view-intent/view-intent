"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./view");
exports.View = view_1.View;
var view_type_store_1 = require("./view-type-store");
var nav_1 = require("./nav");
var helper_1 = require("./helper");
var view_error_1 = require("./view-error");
var state_root_1 = require("./state-root");
var view_root_1 = require("./view-root");
var data_fetch_1 = require("./data-fetch");
var utility_collection_1 = require("utility-collection");
var view_intent_dom_1 = require("./view-intent-dom");
var React = require("react");
exports.React = React;
var ReactDOM = require("react-dom");
exports.ReactDOM = ReactDOM;
var config_1 = require("./config");
// export
var persistent_1 = require("./persistent");
exports.Persistent = persistent_1.Persistent;
var view_frame_1 = require("./view-frame");
exports.ViewFrame = view_frame_1.ViewFrame;
var component_1 = require("./component");
exports.Component = component_1.Component;
// export { IIntent, IViewInfo, IRootStore, IConfig } from "./types";
// export * from "./data-fetch";
// import { Main } from "../main";
var ViewIntent;
(function (ViewIntent) {
    function config(config) {
        config_1.Config.set(config);
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
    function intentView(intentOrUrl, viewState, callback) {
        if (viewState === void 0) { viewState = null; }
        if (callback === void 0) { callback = null; }
        var intent = helper_1.Helper.pathToIntent(intentOrUrl, viewState);
        var url = helper_1.Helper.removeSharp(intentOrUrl);
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
        for (var i = 0; i < viewInfo.require.length; i++) {
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
    function init(element, intent, hotLoader) {
        if (intent === void 0) { intent = null; }
        if (hotLoader === void 0) { hotLoader = true; }
        view_root_1.ViewRoot.htmlInit(intent, element, hotLoader);
        nav_1.Nav.start(intent);
        data_fetch_1.DataFetch.get(window.location.href);
        view_intent_dom_1.ViewIntentDom.init();
        window.addEventListener("popstate", function (e) {
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
// requestAnimationFrame(() => {
//   if (Config.options.element !== null && Config.options.element !== undefined) {
//     ViewIntent.config(Config.options);
//   }
// });
exports.default = ViewIntent;
//# sourceMappingURL=main.js.map