"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajax_worker_1 = require("ajax-worker");
var nav_1 = require("./nav");
var utility_collection_1 = require("utility-collection");
var state_root_1 = require("./state-root");
var DataFetch;
(function (DataFetch) {
    var isReactNative = false;
    function get(url, data) {
        if (data === void 0) { data = null; }
        var u = new utility_collection_1.Url("url");
        u.setQueries(data);
        this.genericFetch(url, "get");
    }
    DataFetch.get = get;
    function post(url, data) {
        if (data === void 0) { data = {}; }
        this.genericFetch(url, "post", data);
    }
    DataFetch.post = post;
    function put(url, data) {
        if (data === void 0) { data = {}; }
        this.genericFetch(url, "put", data);
    }
    DataFetch.put = put;
    function patch(url, data) {
        if (data === void 0) { data = {}; }
        this.genericFetch(url, "patch", data);
    }
    DataFetch.patch = patch;
    function del(url, data) {
        if (data === void 0) { data = {}; }
        var u = new utility_collection_1.Url("url");
        u.setQueries(data);
        this.genericFetch(url, "delete");
    }
    DataFetch.del = del;
    function genericFetch(url, method, data) {
        if (data === void 0) { data = null; }
        console.warn("TODO: increment the loader count here.");
        ajax_worker_1.AjaxWorker.fetch({
            url: url,
            method: method,
            headers: [
                ["request", "state"],
            ],
            onSuccess: function (response) {
                nav_1.Nav.intentView(response.data.intent, response.urlRedirected);
                state_root_1.StateRoot.applyStatesRoots(response.data.states);
            },
            onAbort: function (request) {
                console.warn("aborted request", request);
            },
            onError: function (response) {
                console.error("error request", response);
            },
            onDone: function (response) {
                console.error("done request", response);
                console.warn("TODO: decrease the loader counter here.");
            },
        });
    }
})(DataFetch = exports.DataFetch || (exports.DataFetch = {}));
exports.default = DataFetch;
//# sourceMappingURL=data-fetch.js.map