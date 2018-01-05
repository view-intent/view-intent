import Holder from "./holder";
import Helper from "../../helpers/helper";
import ViewConfig from "./viewConfig";

// View Abstract class ------------------------------------

export abstract class View implements View.Adapter {
	public viewInfo: any = null;
	public id: string = null;
	public holderId: string = null;
	public viewElement: HTMLElement = null;
	public holders: Array<Holder> = [];

	public getHolders() {
		return Holder.getHoldersInView(this.id);
	}

	public async mapHolders(): Promise<void> {
		Helper.Dom.childElementDown(this.viewElement, (element, parent) => {
			Holder.registerElement(element, this);
		});
	}

	public async registerEvents(): Promise<void> {
		throw "regiterEvents need to be implemented"; 
	}

	// navigate to view
	// /{holder}/{viewid}/
	public async intent(target: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	}

	public async setTemplate(template: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	}

	public async setModel(model: any): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	}

	public async show(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	}

	public async hide(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	}

	public async close(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	}

	public async generateBaseElement(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	}

	public async render() {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	}

	public constructor() {

	}
}
// View module -----------------------------------------------------
export module View {
	export const store: { [viewId: string]: View } = {};
	export function getViewsInHolder(holderId: string) {
		let viewReturn: Array<View> = getViews().map((view, index) => {
			if (view.holderId === holderId) {
				return view;
			}
		});
		return viewReturn;
	}
	export function getViews() {
		let viewsReturn: Array<View> = [];
		for (let viewId in View.store) {
			if (View.store.hasOwnProperty(viewId)) {
				let view = View.store[viewId];
				viewsReturn.push(view);
			}
		}
		return viewsReturn;
	}
	export function init() {
		console.log("view started --------- ");
	}
}
// View Adapter --------------------------------------------
export module View {
	export interface Adapter {
		
	}
	export module Adapter {
		const store: { [viewType: string]: Options } = {};
		export interface Options {
			builder<T>(): Promise<View>;
		}
		export function register(viewType:string, options: Adapter.Options) : void {
			store[viewType] = options;
		}
		export function create(viewType :string) : Promise<View> {
			if(!Helper.Is.nullOrUndefined(store[viewType])) {
				return store[viewType].builder();
			} else {
				throw `The adapter ${viewType} is not registered!`;
			}
		}
	}
}
// View Routine --------------------------------------------
export module View {
	export module Routine {
		export const store: { [key: string]: Options } = {};
		export function register(key: string, options: Routine.Options) {
			store[key] = options;
		}
		export interface Options {
			init: (view: View | null) => Promise<boolean>;
			// loading -------------------------------------------
			load: (view: View | null) => Promise<boolean>;
			loaded: (view: View | null) => Promise<boolean>;
			// ----
			destroy: (view: View | null) => Promise<boolean>;
			destroyed: (view: View | null) => Promise<boolean>;
			// ----
			render: (view : View | null) => Promise<boolean>;
			rendered: (view : View | null) => Promise<boolean>;
			// ----
			hide: (view : View | null) => Promise<boolean>;
			hided: (view: View | null) => Promise<boolean>;
			// ----
			show: (view : View | null) => Promise<boolean>;
			showed: (view: View | null) => Promise<boolean>;
			// template


			// ----------------------------------------------------
			// // init --------------------------------------------
			// beforeInit?: (view: View | null) => Promise<boolean>;
			// afterInit?: (view: View | null) => Promise<boolean>;
			// // loader -------------------------------------------
			// beforeLoader?: (view: View | null) => Promise<boolean>;
			// afterLoader?: (view: View | null) => Promise<boolean>;
			// // --
			// beforeDestroy?: (view: View | null) => Promise<boolean>;
			// afterDestroy?: (view: View | null) => Promise<boolean>;
			// // --
			// beforeRender?: (view: View | null) => Promise<boolean>;
			// afterRender?: (view: View | null) => Promise<boolean>;
			// // show hide ----------------------------------------
			// beforeShow?: (view: View | null) => Promise<boolean>;
			// afterShow?: (view: View | null) => Promise<boolean>;
			// // --
			// beforeHide?: (view: View | null) => Promise<boolean>;
			// afterHide?: (view: View | null) => Promise<boolean>;
		}
		export function init() {

		}
	}
}
export default View;