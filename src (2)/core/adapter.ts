export interface Adapter {
	// slug:
	builder: () => void;
}
export module Adapter {
	var store: { [type:string] : Adapter } = {};
	export function register(type:string, adapter: Adapter) {
		store[type] = adapter;
	}
}