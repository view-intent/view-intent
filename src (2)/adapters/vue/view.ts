// import from "Vue";
// import vueResource from '@types/vue-resource';
// import * as Vue from 'vue-resource';
import Vue from "vue";
import Component from 'vue-class-component';
import View from "../../src/View";



// class for ViewAdapter
export class VueView extends View {
	public RequireTemplate: boolean = true;
	public async Inject(viewInfo: DynamicView.DynamicViewInfo): Promise<void> {
		super.Inject(viewInfo);
		this.InjectModel(this.ViewInfo.model);
	}

	public async InjectTemplate(template: string | null): Promise<void> {
		if (template != null && template != undefined) {
			var beforeRender = await Dynamic.Execute("beforeRender", this);
			this.BaseElement.innerHTML = template;
			var afterRender = await Dynamic.Execute("afterRender", this);
			// this.BaseElement.innerHTML = "ok";
			// console.log(template);
			// console.log(this.BaseElement);
			// console.log("template 2");
		} else {
			//if (this.ViewInfo.docRendered === true) {
			//	var beforeRender = await Dynamic.Execute("beforeRender", this);
			//	var afterRender = await Dynamic.Execute("afterRender", this);
			//}
		}


	}
	public async InjectModel(model: any): Promise<void> {
		// razor will never insert model	
	}
}



//export class VueView extends View {
//	private instance: any;
//	public builder<VueView>(el: HTMLElement) {
//		this.instance = VueView.defaultView(el);
//	}
//}
export module VueView {
	export function defaultView(el: HTMLElement) : any {
		var app = new Vue({
			el: el,
			data: {
				get: { },
				post: {	}
			}
		})
	}
}







// import View from "../src/view";

// export class VueView2 extends View {

// }
// export module VueView {
// 	export function generate() {
// 		// var app = new Vue({
// 		// 	el: '#app',
// 		// 	data: {
// 		// 	message: 'Hello Vue!'
// 		// 	}
// 		// })
// 		// return new Vue({
// 		// 	el: "#app",
// 		// 	template: `
// 		// 	<div>
// 		// 		<div>Hello {{name}}!</div>
// 		// 		Name: <input v-model="name" type="text">
// 		// 	</div>`,
// 		// 	data: {
// 		// 		name: "World"
// 		// 	}
// 		// });
// 	}
// }
// console.log("ok"); 