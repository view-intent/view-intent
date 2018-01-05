
// import Vue, { ComponentOptions } from 'vue';
// import Component from 'vue-class-component';
// --------
// console.log("ok3");

// import Vue from "vue";

// declare const Vue : any;
// import * as Holder_ from  "./src/holder";
// import { default as Holder } from "./core/holder";
// import { default as View } from "./core/view";
// import { default as Adapter } from "./core/adapter";

// import { default as Adapter } from "./src/adapter";

import "./main.scss";

import { Slot } from "./slots/slot";
import { Dom } from "utility-collection";
import { View } from "./views/view";
import "./views/view-default";
// import "./views/body-scroll";

// console.log(Dom);
// console.log(UtilityCollection.Dom);
// console.log("ViewIntent -");
export enum IViewType {
	Orders = "Orders",
	NewOrder = "NewOrders"
}
export interface IView {
	Id?: IViewType;
	Require?: Array<IViewType>;
}
var View1: IView = {
	Id: IViewType.NewOrder,
	Require: []
};
console.log(View1);



export module ViewIntent {
	// export var holder = Holder;
	// export var View : View.Adapter = View;
	// export var creator : string = "created";
	export interface IOptions {}
	export var init: (options?: IOptions) => void  = (options?: IOptions): void => {
		View.init();
		setImmediate(() => {
			// registerAllViewsAndSlots(document.body);
		});
	};
	export var registerView: (viewType: ViewTypes) =>void = () => {
		console.log("view intent registered");
	};

	export var registerStartedView: (element: Element) => void = (element: Element): void => {

	};
	
	// export function registerAllViewsAndSlots(element: HTMLElement) {
	// 	if (element.tagName === "body") {
	// 		// view.registerView("document", document);
	// 		Slot.registerSlotElement(document.body);
	// 	}
	// 	Dom.elementDown(element, (item) => {
	// 		var dataSlotId: string = item.getAttribute("data-slot");
	// 		// if(item.getAttribute("data-slot-id" !== undefined)) {
	// 		// }
	// 		if (item.id == "main1") {
	// 			return false;
	// 		}
	// 	});

	// }
	// init({});
}

export function $$(viewType: string, callback: () => void) : void {

}

export function $View(viewOptions: any) {
	// console.log(" ---- node -> main ");
}
export function $ViewType() {

}


export default ViewIntent;




// export default ViewIntent;



// testing
// @Component
// class MyComp extends Vue {
// 	beforeRouteEnter() {
// 		console.log('beforeRouteEnter')
// 	}
// 	beforeRouteLeave() {
// 		console.log('beforeRouteLeave')
// 	}
// }



// interface MyComponent extends Vue {
// 	message: string
// 	onClick(): void
// }
// export default {
// 	template: '<button @click="onClick">Click!</button>',
// 	data: function () {
// 		return {
// 			message: 'Hello!'
// 		}
// 	},
// 	methods: {
// 		onClick: function () {
// 			window.alert(this.message)
// 		}
// 	}
// } as ComponentOptions<MyComponent>


// function f() {
// 	console.log("f(): evaluated");
// 	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
// 		console.log(target);
// 		console.log("f(): called");
// 	}
// }

// function g() {
// 	console.log("g(): evaluated");
// 	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
// 		console.log(target);
// 		console.log("g(): called");
// 	}
// }

// class C {
// 	@f()
// 	@g()
// 	method() { }
// }