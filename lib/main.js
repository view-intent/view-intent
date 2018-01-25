"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx = require("mobx");
var view_type_store_1 = require("./view-type-store");
var nav_1 = require("./nav");
var helper_1 = require("./helper");
var view_error_1 = require("./view-error");
var state_root_1 = require("./state-root");
var view_root_1 = require("./view-root");
var data_fetch_1 = require("./data-fetch");
// ----------------------------------------
var view_1 = require("./view");
exports.View = view_1.View;
var view_frame_1 = require("./view-frame");
exports.ViewFrame = view_frame_1.ViewFrame;
mobx.extras.isolateGlobalState();
var ViewIntent;
(function (ViewIntent) {
    ViewIntent.Fetch = data_fetch_1.DataFetch;
    function intentView(intent, viewState) {
        if (viewState === void 0) { viewState = null; }
        var newIntent = helper_1.Helper.pathToIntent(intent, viewState);
        if (newIntent != null) {
            nav_1.Nav.intentView(newIntent, null);
        }
    }
    ViewIntent.intentView = intentView;
    function registerViewType(viewInfo) {
        view_type_store_1.ViewTypeStore.registerViewType(viewInfo);
    }
    ViewIntent.registerViewType = registerViewType;
    function init(element, intent) {
        if (intent === void 0) { intent = null; }
        view_root_1.ViewRoot.htmlInit(intent, element);
        nav_1.Nav.start(intent);
        data_fetch_1.DataFetch.get(window.location.href);
    }
    ViewIntent.init = init;
    function registerStateRoot(stateName, stateRootInstance) {
        state_root_1.StateRoot.registerStateRoot(stateName, stateRootInstance);
    }
    ViewIntent.registerStateRoot = registerStateRoot;
})(ViewIntent = exports.ViewIntent || (exports.ViewIntent = {}));
ViewIntent.registerViewType(view_error_1.ViewNotFound.viewInfo);
exports.default = ViewIntent;
//# sourceMappingURL=main.js.map