// --------
// import Vue from "vue";
// declare const Vue : any;
// import * as Holder_ from  "./src/holder";
import { default as Holder } from "./src/holder";
import { default as View } from "./src/view";
// import { default as Adapter } from "./src/adapter";
export var ViewIntent;
(function (ViewIntent) {
    function init(options) {
        Holder.init();
        View.init();
    }
    ViewIntent.init = init;
    init();
})(ViewIntent || (ViewIntent = {}));
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
//# sourceMappingURL=viewIntent.js.map