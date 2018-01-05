import { Slot } from "../slots/slot";
import { Dom, Is, Event } from "utility-collection";
import { ViewHistory } from "./view-history";
import AjaxWork from 'ajax-worker';

// ViewHistory.init();

// show ----------
const SHOW_FROM_RIGHT = "show--from-right";
const SHOW_FROM_LEFT = "show--from-left";
const SHOW = "show";
// hide ----------
const HIDE = "hide";
const HIDE_TO_RIGHT = "hide--to-right";
const HIDE_TO_LEFT = "hide--to-left";
// loading
const LOADING = "loading";
const LOADED = "loaded";
const LOAD_ERROR = "load-error";
// atributes 
const DATA_VIEW = "data-view";


// ---------------------------------------------
export interface ViewElements {
	root?: HTMLElement,
	content?: HTMLElement,
	backButton?: HTMLElement
}
export interface ViewTemplate {
	content?: string,
	loading?: string,
	error?: string
}


export abstract class View {
	public type: string = undefined;
	public index: number = -1;
	public base: ViewElements = {}; // base is the elements that will be generated instantly
	public visible: boolean = false;
	public slot: string = undefined;
	public inline : boolean = false; 
	public dataUrl: string = undefined;
	public maxWidth: string = "100%";
	public backView : View = undefined;
	private _parentView : View = undefined;
	public data : any = {
		model: undefined
	};
	public initialized : boolean = false; 
	// slots ----------------------
	public html: ViewTemplate = {
		content: "",
		loading: "",
		error: ""
	};
	public get parentView() {
		if(this._parentView == undefined) {
			this._parentView = Slot.getSlot(this.slot).parentView;
		}
		return this._parentView;
	}
	// methods ---------------------------------
	init(baseRoot: HTMLElement = undefined) {
		if(!this.initialized) {
			this.initialized = true;
			if(baseRoot != undefined) {
				// this.base.root = baseRoot;
				this.dataUrl = baseRoot.getAttribute("data-url");
				this.html.content = baseRoot.innerHTML;
				this.inline = true;
			}
			if(baseRoot.tagName !== "BODY") {
				baseRoot.setAttribute("data-view-index", this.index.toString());
			}
			this.base = this.baseHtmlBuilder();
			this.setContent(this.html.content);
			if(this.base.root != baseRoot) {
				Dom.replaceElement(baseRoot, this.base.root);
			}
			Slot.getSlot(this.slot).subscribeView(this);
		}
	}




	baseHtmlBuilder(): ViewElements {
		const html = `
<div data-view="${this.type}">
	<div data-content></div>
</div>`;
		//${this.html.content}
		var newRoot = Dom.htmlToElement(html);
		var newContent = newRoot.querySelector("[data-content]") as HTMLElement;
		
		return {
			root: newRoot,
			content: newContent
		}
	}
	requestData(url: string, method: string = "get") {
		let self = this;
		self.base.root.classList.remove(LOADED);
		self.base.root.classList.add(LOADING);
		AjaxWork.fetch({
			url: url,
			method: method,
			headers: {
				"request": "model"
			},
			onSuccess(r) {
				self.setData(JSON.parse(r.data));
			},
			onError(r) {
				self.base.root.classList.add(LOAD_ERROR);
			},
			onDone(r) {
				self.base.root.classList.add(LOADED);
				self.base.root.classList.remove(LOADING);
			}
		});
	}
	setContent(html: string) {
		this.base.content.innerHTML = html;
		View.mapInlineViews(this.base.content);
	}
	setData(data: any) {
		this.data.model = data;
	}
	// setVisibility(visible: boolean) {
	// 	if(visible) {
	// 		this.show();
	// 	} else {
	// 		this.hide();
	// 	}
	// }
	// ------------------------------
	show(direction : -1 | 0 | 1): void {
		if (this.visible) return;
		this.visible = true;
		// animation css ---------------
		this.base.root.classList.add(SHOW);
		this.base.root.classList.remove(HIDE);
		if (!Is.nullOrUndefined(this.base.root.parentElement)) {
			// animate --------------------------
			if(direction > 0 || direction < 0) {
				this.base.root.classList.remove(HIDE_TO_LEFT);
				this.base.root.classList.remove(HIDE_TO_RIGHT);
				var animationEnd = () => {
					this.base.root.classList.remove(SHOW_FROM_RIGHT);
					this.base.root.classList.remove(SHOW_FROM_LEFT);
				}
				if (direction > 0) {
					this.base.root.classList.add(SHOW_FROM_RIGHT);
				} else if (direction < 0) {
					this.base.root.classList.add(SHOW_FROM_LEFT);
				}
				Event.once(this.base.root, "animationend", animationEnd);
			}
		}
	}
	hide(direction : -1 | 0 | 1): void {
		if (!this.visible) return;
		this.visible = false;
		// change dom animate ---------------------------
		this.base.root.classList.add(SHOW);
		this.base.root.classList.remove(HIDE);
		if (!Is.nullOrUndefined(this.base.root.parentElement)) {
			// animate --------------------------
			if(direction > 0 || direction < 0) {
				this.base.root.classList.remove(SHOW_FROM_LEFT);
				this.base.root.classList.remove(SHOW_FROM_RIGHT);
				var animationEnd = () => {
					this.base.root.classList.remove(HIDE_TO_RIGHT);
					this.base.root.classList.remove(HIDE_TO_LEFT);
				}
				if (direction > 0) {
					this.base.root.classList.add(HIDE_TO_RIGHT);
				} else if (direction < 0) {
					this.base.root.classList.add(HIDE_TO_LEFT);
				}
				Event.once(this.base.root, "animationend", animationEnd);
			}
		}
	}
	public mapChildrenSlots() {
		var self = this;
		Dom.elementDown(this.base.content, (el : HTMLElement)=> {
			var isSlot = Slot.isSlotElement(el);
			if(isSlot) {
				Slot.registerSlotElement(el, self);
			}
		});
	}
	constructor() {
		if (this.index < 0) {
			this.index = View.generateViewId();
		}
		View.registerViewInstance(this);
	}
}








export module View {
	export interface IViewInfo {
		type: string;
		index: string;
		require: Array<String>; // type:index
		slot: string;
	}
	var lastGeneratedViewIndex: number = 0;
	var viewTypeStore: { [typeName: string]: new () => View } = {};
	var viewInstanceStore: { [index: number]: View } = {};
	export function generateViewId(): number {
		this.lastViewId++;
		return lastGeneratedViewIndex;
	}
	export function registerViewInstance(view: View): void {
		viewInstanceStore[view.index] = view;
	}

	export function getAllViews(): Array<View> {
		var views: Array<View> = [];
		for (var i in viewInstanceStore) {
			if (viewInstanceStore.hasOwnProperty(i)) {
				views.push(viewInstanceStore[i]);
			}
		}
		return views;
	}
	export function everyView(callback: (view: View) => void): void {
		for (var key in viewInstanceStore) {
			if (viewInstanceStore.hasOwnProperty(key)) {
				var view: View = viewInstanceStore[key];
				callback(view);
			}
		}
	}
	export function getViewsByType(type: string): Array<View> {
		var views: Array<View> = [];
		everyView((view) => {
			if (view.type === type) {
				views.push(view);
			}
		});
		return views;
	}
	export function getView(type: string, index: "visible" | "last" | "new" | number = "visible"): View {
		if (typeof index === "number") {
			return viewInstanceStore[index];
		} else if (index !== "new") {
			var views: Array<View> = getViewsByType(type);
			if (views.length <= 0) {
				return null;
			} else {
				// return the last visible View if has ones
				if (index === "visible") {
					for (var i: number = views.length - 1; i >= 0; i--) {
						var view: View = views[i];
						if (view.visible) {
							return view;
						}
					}
				}
				// return the last any view with this type
				var lastView: View = views.pop();
				return lastView;
			}
		} else {
			// return new View
			if(viewTypeStore[type] !== undefined) {
				var newView: View = new viewTypeStore[type]();
				return newView;
			}
		}
	}
	export function registerViewType(typeName: string, viewType: new () => View) {
		if (viewTypeStore[typeName] == undefined) {
			viewTypeStore[typeName] = viewType;
		} else {
			throw "duplicate typeName";
		}
	}
	export function getViewType(typeName: string) {
		if(viewTypeStore[typeName] !== undefined) {
			return viewTypeStore[typeName];
		} else {
			throw "viewType doesn't exist";
		}
	}

	export function initializeViewElement(root: HTMLElement) : void { 
		if(root.hasAttribute(DATA_VIEW)) { 
			var typeName = root.getAttribute("data-view");
			var t = getViewType(typeName);
			var view = new t();
			view.init(root);
		}
	}

	export function mapInlineViews(root: HTMLElement = undefined) {
		var elements : Array<HTMLElement> = [];
		Dom.childElementDown(root, (node)=> {
			if(node.hasAttribute(DATA_VIEW)) {
				elements.push(node); 
				return false;
			}
		});
		elements.forEach(element => {
			initializeViewElement(element);
		});
	}
	export function init() {
		View.mapInlineViews(document.body);
	}
}



export default View;