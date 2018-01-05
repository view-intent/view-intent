
import Vue, { ComponentOptions } from 'vue';
// import Component from 'vue-class-component';
// -------- 
console.log("ok2");

// import Vue from "vue";

// declare const Vue : any;
// import * as Holder_ from  "./src/holder";
import { default as Holder } from "./core/holder";
import { default as View } from "./core/view";
import { default as Adapter } from "./core/adapter"; 

// import { default as Adapter } from "./src/adapter";

export module ViewIntent {
	export var holder = Holder;
	export var View : View.Adapter = View;
	// export var creator : string = "created";
	export interface Options {
		
	}
	export function init(options?: Options) {
		Holder.init();
		// View.init();
	}
	init();
} 



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