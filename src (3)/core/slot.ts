export class Slot {
	public slotId: string = null;
	public viewId: string = null;
	get key(): string {
		return Slot.key(this.slotId, this.viewId);
	}
	constructor(slotId: string, viewId: string) {
		this.slotId = slotId;
		this.viewId = viewId;
	}
}
export module Slot {
	var store: { [key: string]: Slot } = {};
	export function key(slotId: string, viewId: string) : string {
		return slotId.toLowerCase() + "__" + viewId.toLowerCase();
	}
	function register(slotId: string, viewId: string) {
		var k: string = key(slotId, viewId);
		store[k] = new Slot(slotId, viewId);
	}
}
export default Slot;