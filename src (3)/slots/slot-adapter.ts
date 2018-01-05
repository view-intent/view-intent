import View from "../views/View";
import Slot from "./slot";
import {Is } from "utility-collection";

export interface SlotAdapterConfig {
	typeName: string;
	showViews(slot: Slot, views: Array<View>): void;
	injectView(slot: Slot, view: View): void;
}

export module SlotAdapter {
	var store: { [key: string]: SlotAdapterConfig } = {};
	export function register(config: SlotAdapterConfig) {
		if(store[config.typeName] === undefined) {
			store[config.typeName] = config;
		} else {
			throw "slot already exists. Can't be overide";
		}
	}
	export function get(typeName :string = null) {
		if(Is.nullOrUndefined(typeName == null)) {
			typeName = "default";
		}
		return store[typeName];
	}
}

SlotAdapter.register({
	typeName: "default",
	showViews: function(slot, views) {
		Slot.allSlots();
	},
	injectView: function(slot, view) {
		slot.element.appendChild(view.baseElement);
	}
});


export default SlotAdapter;
