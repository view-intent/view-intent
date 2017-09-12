import View from "./view";
import Helper from "../../helpers/helper";


export class Holder {
	public id: string = null;
	// public viewId: string | "body"; // parent viewIds
	public parentView : View = null;
	public holderElement: HTMLElement = null;
	// ---------------------------------------------
	public getViews() {
		return View.getViewsInHolder(this.id);
	}

	public linkView(view: View) {
		view.holderId = this.id;
		if(!this.holderElement.contains(view.viewElement)) {
			this.holderElement.appendChild(view.viewElement);
		}
	}

	// public unlinkView(viewId: string) {
	// 	// delete View;
	// }

	public constructor(id:string, parentView: View) {
		this.id = id;
		this.parentView = parentView;
	}
}
// MODULE ---------------------------------------
export module Holder {
	export const store: { [holderId: string]: Holder } = {};
	export function registerElement(element: HTMLElement, parentView: View): void {
		// validate if is a holder element ---------------------------------
		var viType = element.getAttribute("data-vi-type");
		if(Helper.Is.empty(element.id) || viType !== "holder") {
			return;
		}

		// Find holderid ------------------------------------------------
		var holderId: string = null;
		if (element.tagName === "body") {
			holderId = "body";
		} else if (!Helper.Is.empty(element.id)) {
			holderId = element.id;
		} else {
			throw "Every holder must have an id attribute";
		}

		// register with element ----------------------------------------
		if (holderId !== null) {
			if (Helper.Is.nullOrUndefined(store[holderId])) {
				store[holderId] = new Holder(holderId, parentView);
			}
			store[holderId].holderElement = element;
			// append all views visible in this element -----------------
			View.getViewsInHolder(holderId).map((view)=> {
				store[holderId].linkView(view);
			});
		} else {
			throw "Element doesn't have unique id.";
		}
	}
	export function getHoldersInView(viewId : string) {
		let holderReturn : Array<Holder> = getHolders().map((holder, index)=> {
			if(holder.parentView.id === viewId) {
				return holder;
			}
		});
		return holderReturn;
	}

	export function getHolders() : Array<Holder> {
		let holdersReturn: Array<Holder> = [];
		for (let holderId in Holder.store) {
			if (Holder.store.hasOwnProperty(holderId)) {
				let holder = Holder.store[holderId];
				holdersReturn.push(holder);
			}
		}
		return holdersReturn;
	}
	export function getHolderById(holderId: string): Holder | boolean {
		if (doesExist(holderId)) {
			return store[holderId];
		} else {
			return false;
		}
	}
	export function doesExist(holderId: string) {
		if (Helper.Is.nullOrUndefined(store[holderId])) {
			return false;
		} else {
			return true;
		}
	}
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
	export function init() {

		
		// Holder.mapHolders(document.body);
		// mutation-
		// select the target node
		var target = document.body
		// create an observer instance
		setTimeout(() => {
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
			el.innerHTML = "{{viewid}}"
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
}

export default Holder;


