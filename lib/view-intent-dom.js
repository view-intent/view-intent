"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_collection_1 = require("utility-collection");
var helper_1 = require("./helper");
var main_1 = require("./main");
var ViewIntentDom;
(function (ViewIntentDom) {
    function init() {
        setLinksMiddleware();
    }
    ViewIntentDom.init = init;
    function setLinksMiddleware() {
        document.addEventListener("click", function (e) {
            var isTagA = false;
            var targetNode = e.target;
            var linkNode = null;
            if (targetNode.nodeName === "A") {
                isTagA = true;
                linkNode = targetNode;
            }
            else {
                utility_collection_1.Dom.parentElementUp(targetNode, function (node) {
                    if (node.nodeName === "A") {
                        isTagA = true;
                        linkNode = node;
                        return true;
                    }
                });
            }
            if (isTagA === true) {
                var linkTarget = linkNode.getAttribute("target");
                var linkHref = linkNode.getAttribute("href");
                if (linkTarget !== null && linkTarget !== undefined) {
                    if ((linkTarget.toLowerCase() === "_blank")) {
                        return;
                    }
                }
                if (linkHref !== null && linkTarget !== undefined) {
                    if (helper_1.Helper.isViewIntentUrl(linkHref)) {
                        main_1.ViewIntent.intentView(linkHref);
                        e.preventDefault();
                    }
                }
            }
        }, true);
    }
})(ViewIntentDom = exports.ViewIntentDom || (exports.ViewIntentDom = {}));
//# sourceMappingURL=view-intent-dom.js.map