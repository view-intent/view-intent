import { Dom } from "utility-collection";
import { Helper } from "./helper";
import { ViewIntent } from "./main";
export var ViewIntentDom;
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
                Dom.parentElementUp(targetNode, function (node) {
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
                    if (Helper.isViewIntentUrl(linkHref)) {
                        ViewIntent.intentView(linkHref);
                        e.preventDefault();
                    }
                }
            }
        }, true);
    }
})(ViewIntentDom || (ViewIntentDom = {}));
//# sourceMappingURL=view-intent-dom.js.map