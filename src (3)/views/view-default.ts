// import { CombinedVueInstance } from 'vue/types';
import View from "./view";
import Vue from "vue";
import { VueComponentsCollection, ComponentValidation } from "vue-components-collection";
import HolyValidation from "holy-validation";
import { Dom, Is, Event } from "utility-collection";
import AjaxWork from 'ajax-worker';

// view ---------------------------------
const DEFAULT_TYPE = "default";
export class DefaultView extends View {
	type = DEFAULT_TYPE;
	constructor() {
		super();
	}
}
View.registerViewType(DEFAULT_TYPE, DefaultView);


// vue ----------------------------------
const VUE_TYPE = "vue";
export class VueView extends View {
	type = VUE_TYPE;
	public vueInstance: Vue = null;
	methods = {

	}
	initVueInstance() {
		if(this.vueInstance == null) {
			var self = this;
			this.vueInstance = new Vue({
				el: this.base.content,
				methods: {
					"errors": (...args: Array<any>) => {
						// console.log(args);
					},
					"isValid": function (group: string) {
						return ComponentValidation.isValid(group);
					},
					"validate": function (group: string) {
						return ComponentValidation.validate(group);
					}
				}, 
				data: () => {
					return self.data;
				},
				template: `<div>${this.html.content}</div>` 
			});
		}
	}
	setContent(html: string) {
		if (!Is.nullOrUndefined(this.dataUrl)) {
			this.requestData(this.dataUrl, "get");
		} else {
			this.requestData(window.location.href); 
		}
	}
	setData(data: any) {
		this.data.model = data;
		this.initVueInstance(); 
	}
	constructor() {
		super();
	}
}
View.registerViewType(VUE_TYPE, VueView); 
