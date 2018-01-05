import View from "./view";

export interface ViewAdapter<T> {
	view: View;
	builder(view:View) : T;
	// -------------------------------------------------
	inject(view: View, data: string | object) : void;
	afterInject(view: View) :void; 
	// ---------------



	// request: (url: string) => void;
	// // loader
	// // beforeInit : (View: View)=> void;
	// beforeInit: (view: View) => void;
	// afterRender: (view:View) => void;
	// // 
	// contentBuilder: (view: View,  data: any, template: string) => void;
}
export module ViewAdapter {
	var store : {[key: string]: ViewAdapter } = {};
	export function registerAdapter(typeName: string, adapter: new () => ViewAdapter) {

	}
}

export class StaticAdapter implements ViewAdapter<StaticAdapter> {

}
ViewAdapter.registerAdapter("static", StaticAdapter);







export interface Config {
	beforeLoader?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	afterLoader?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	//	loader -------------------------
	beforeInit?: (view: DynamicView.AbstractViewAdapter | null ) => Promise<boolean>;
	init?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	beforeDestroy?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	beforeRender?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	afterRender?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	// show hide ------------------------------------------------
	beforeShow?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	afterShow?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	beforeHide?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
	afterHide?: (view: DynamicView.AbstractViewAdapter | null) => Promise<boolean>;
}

export default ViewAdapter;