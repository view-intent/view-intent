export interface ViewTypeOptions {
	adapter: string;
}
export class ViewType {
	adapter: string = "static";
}
export module ViewType {
	var store: { [viewType: string]: ViewTypeOptions } = {};
	export function registerViewType(options: ViewTypeOptions) {
		options
	}
}





export default ViewType;