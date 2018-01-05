export module Helper.Is {
	export function nullOrUndefined(value: any) {
		if(value === undefined || value === null ) {
			return true;
		} else {
			return false;
		}
	}
	export function empty(value:any) {
		if(value === undefined || value === null || value === "" ) {
			return true;
		} else {
			return false;
		}
	}
}
export default Helper.Is;