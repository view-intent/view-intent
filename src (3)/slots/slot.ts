import { Is, Dom } from 'utility-collection';
import View from "../views/view";

const DATA_SLOT_ADAPTER = "data-slot-adapter";
const DATA_SLOT = "data-slot";

export class Slot {
	public slotId: string;
	public parentView : View ;
	public initialized : boolean = false; 
	private _element: HTMLElement = undefined;
	get element(): HTMLElement {
		if (Is.mobile && this._element !== undefined) {
			return document.body;
		} else {
			return this._element;
		}
	}
	set element(value: HTMLElement) {
		if (this._element == undefined) {
			this._element = value;
			this.initializeElement();
		} else {
			throw 'Slot is duplicate. Use a unique "data-slot" for all views;';
		}
	}
	// views ------------------------------------------
	private viewsIndex: Array<number> = [];
	// private currentSlotViewIndex : number = -1;
	private initializeElement() {
		// TODO: append all views ----
	}
	public hideDirection(view: View): number {
		var lastView: number = this.viewsIndex[this.viewsIndex.length - 1] + 0;
		if (lastView > view.index) {
			return -1;
		} else if (lastView < view.index) {
			return 1;
		} else {
			return 0;
		}
	}
	// show view must be called first
	public showView(view: View): number {
		var lastView: number = this.viewsIndex[this.viewsIndex.length - 1] + 0;
		var oldIndex = this.viewsIndex.lastIndexOf(view.index);
		if (oldIndex > -1) {
			this.viewsIndex.splice(oldIndex, 1);
		}
		this.viewsIndex.push(view.index);
		// animation number -----------------------
		if (lastView > view.index) {
			return 1;
		} else if (lastView < view.index) {
			return -1;
		} else {
			return 0;
		}
	}

	// private cacheBaseElements: Array<HTMLElement> = [];
	public removeViewElement(view: View) {
		if (this.element !== undefined) {
			Dom.remove(view.base.root);
		}
	}
	public appendViewElement(view: View) {
		if (this.element !== undefined) {
			Dom.prependChild(this.element, view.base.root);
		}
	}
	public subscribeView(view: View) {
		if (this.viewsIndex.indexOf(view.index) === -1) {
			this.viewsIndex.push(view.index);
		}
	}
	public unsubscribeView(view: View) {
		if (this.viewsIndex.indexOf(view.index) > -1) {
			delete this.viewsIndex[view.index];
		}
	}
	constructor(slotId: string, parentView : View = undefined) {
		this.slotId = slotId;
		this.parentView = parentView;
	}
}

export module Slot {
	export interface SlotElementInfo {
		slotId?: string;
		slotAdapter?: string;
	}
	var store: { [slotId: string]: Slot } = {};
	export function getSlot(slotId: string) {
		if (store[slotId] === undefined) {
			store[slotId] = new Slot(slotId);
		}
		return store[slotId];
	}
	// export function getVisibleSlots() {
	// 	var visiblesSlots: Array<Slot> = [];
	// 	everySlot((slot) => {
	// 		visiblesSlots.push(slot);
	// 	});
	// }
	export function everySlot(callback: (slot: Slot) => void): void {
		for (var key in store) {
			if (store.hasOwnProperty(key)) {
				var slot = store[key];
				callback(slot);
			}
		}
	}
	export function isSlotElement(element : HTMLElement) : boolean {
		if(element.tagName == "BODY") {
			return true;
		} else if (element.getAttribute(DATA_SLOT)) {
			return true;
		}
		return false;
	}
	export function getSlotElementinfo(element: HTMLElement): SlotElementInfo {
		var slotElementInfo: SlotElementInfo = {};
		slotElementInfo.slotId = element.getAttribute(DATA_SLOT);
		slotElementInfo.slotAdapter = element.getAttribute(DATA_SLOT_ADAPTER);
		return slotElementInfo;
	}
	export function registerSlotElement(element: HTMLElement, parentView: View = undefined) {
		var info: SlotElementInfo;
		if (element.tagName == 'BODY') {
			info.slotId = "body";
			info.slotAdapter = "default";
		} else {
			info = getSlotElementinfo(element);
		}
		if(!Is.nullOrUndefined(info.slotId)) {
			var slot = getSlot(info.slotId);
			slot.element = element;
			slot.parentView = parentView;
			slot.initialized = true;
		}
	}
}


export default Slot;

