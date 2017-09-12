import View from "./view";
import Helper from "../../helpers/helper";
var Holder = (function () {
    // public unlinkView(viewId: string) {
    // 	// delete View;
    // }
    function Holder(id, parentView) {
        this.id = null;
        // public viewId: string | "body"; // parent viewIds
        this.parentView = null;
        this.holderElement = null;
        this.id = id;
        this.parentView = parentView;
    }
    // ---------------------------------------------
    Holder.prototype.getViews = function () {
        return View.getViewsInHolder(this.id);
    };
    Holder.prototype.linkView = function (view) {
        view.holderId = this.id;
        if (!this.holderElement.contains(view.viewElement)) {
            this.holderElement.appendChild(view.viewElement);
        }
    };
    return Holder;
}());
export { Holder };
// MODULE ---------------------------------------
(function (Holder) {
    Holder.store = {};
    function registerElement(element, parentView) {
        // validate if is a holder element ---------------------------------
        var viType = element.getAttribute("data-vi-type");
        if (Helper.Is.empty(element.id) || viType !== "holder") {
            return;
        }
        // Find holderid ------------------------------------------------
        var holderId = null;
        if (element.tagName === "body") {
            holderId = "body";
        }
        else if (!Helper.Is.empty(element.id)) {
            holderId = element.id;
        }
        else {
            throw "Every holder must have an id attribute";
        }
        // register with element ----------------------------------------
        if (holderId !== null) {
            if (Helper.Is.nullOrUndefined(Holder.store[holderId])) {
                Holder.store[holderId] = new Holder(holderId, parentView);
            }
            Holder.store[holderId].holderElement = element;
            // append all views visible in this element -----------------
            View.getViewsInHolder(holderId).map(function (view) {
                Holder.store[holderId].linkView(view);
            });
        }
        else {
            throw "Element doesn't have unique id.";
        }
    }
    Holder.registerElement = registerElement;
    function getHoldersInView(viewId) {
        var holderReturn = getHolders().map(function (holder, index) {
            if (holder.parentView.id === viewId) {
                return holder;
            }
        });
        return holderReturn;
    }
    Holder.getHoldersInView = getHoldersInView;
    function getHolders() {
        var holdersReturn = [];
        for (var holderId in Holder.store) {
            if (Holder.store.hasOwnProperty(holderId)) {
                var holder = Holder.store[holderId];
                holdersReturn.push(holder);
            }
        }
        return holdersReturn;
    }
    Holder.getHolders = getHolders;
    function getHolderById(holderId) {
        if (doesExist(holderId)) {
            return Holder.store[holderId];
        }
        else {
            return false;
        }
    }
    Holder.getHolderById = getHolderById;
    function doesExist(holderId) {
        if (Helper.Is.nullOrUndefined(Holder.store[holderId])) {
            return false;
        }
        else {
            return true;
        }
    }
    Holder.doesExist = doesExist;
    // export var maped: Array<Node> = [];
    // export function mapHolders_(node: Element) {
    // 	Helper.Dom.childElementDown(node, (node) => {
    // 		if (!Helper.Is.empty(node.id)) {
    // 			var viType = node.getAttribute("data-vi-type");
    // 			if (viType === "holder") {
    // 			}
    // 		}
    // 		maped.push(node);
    // 		return true;
    // 	});
    // 	console.log("exist", document.body.contains(maped[5]));
    // 	console.log(maped);
    // 	Helper.Dom.childElementDown(node, (node) => {
    // 		// maped.push(node);
    // 		// delete maped[0];
    // 		node.parentNode.removeChild(node);
    // 		return true;
    // 	});
    // 	console.log("exist", document.body.contains(maped[5]));
    // 	console.log(maped);
    // }
    function init() {
        // Holder.mapHolders(document.body);
        // mutation-
        // select the target node
        var target = document.body;
        // create an observer instance
        setTimeout(function () {
            var observer = new MutationObserver(function (mutations) {
                // console.log(mutations);
                mutations.forEach(function (mutation) {
                    // console.log(mutation);
                    console.log(mutation.addedNodes);
                    // console.log(mutation.type);
                });
            });
            // pass in the target node, as well as the observer options
            observer.observe(document.body, { attributes: true, subtree: true, childList: true, characterData: false });
            var el = document.createElement("div");
            el.innerHTML = "{{viewid}}";
            setTimeout(function () {
                el.appendChild(document.createElement("a"));
                document.body.appendChild(el);
                setTimeout(function () {
                    console.log("appended");
                }, 2000);
            }, 900);
            // TODO: observer holder and view ---------------
        }, 500);
        // later, you can stop observing
        // observer.disconnect();
    }
    Holder.init = init;
})(Holder || (Holder = {}));
export default Holder;
//# sourceMappingURL=holder.js.map