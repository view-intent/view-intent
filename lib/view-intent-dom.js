import { Dom } from "utility-collection";
import { Helper } from "./helper";
import { DataFetch } from "./data-fetch";
export var ViewIntentDom;
(function (ViewIntentDom) {
    function init() {
        setLinksMiddleware();
    }
    ViewIntentDom.init = init;
    function setLinksMiddleware() {
        document.addEventListener("click", (e) => {
            let isTagA = false;
            const targetNode = e.target;
            let linkNode = null;
            if (targetNode.nodeName === "A") {
                isTagA = true;
                linkNode = targetNode;
            }
            else {
                Dom.parentElementUp(targetNode, (node) => {
                    if (node.nodeName === "A") {
                        isTagA = true;
                        linkNode = node;
                        return true;
                    }
                });
            }
            if (isTagA === true) {
                const linkTarget = linkNode.getAttribute("target");
                const linkHref = linkNode.getAttribute("href");
                if (linkTarget !== null && linkTarget !== undefined) {
                    if ((linkTarget.toLowerCase() === "_blank")) {
                        return;
                    }
                }
                if (Helper.isViewIntentUrl(linkHref)) {
                    DataFetch.get(linkHref);
                    e.preventDefault();
                }
            }
        }, true);
    }
})(ViewIntentDom || (ViewIntentDom = {}));
//# sourceMappingURL=view-intent-dom.js.map