export module Util {
	const isNumberRegex: RegExp = /\D/;
	export function isNumber(value: string): boolean {
		return !isNumberRegex.test(value);
	}
	export function stringReplace(value: string, search: string, replacement: string) {
		return value.split(search).join(replacement);
	}
	export function pathArray(path: string): Array<string> {
		return path.split(".");
	}
	export function merge(base: any, source: any): void {
		for (var i in source) {
			base[i] = source[i];
		}
	}
}