export module Render {
	var executing = false;
	var queuedList: Array<Function> = [];
	var readyFunc : Function = undefined;
	export function async(callback: () => void) {
		queuedList.push(callback);
		if (executing === false) {
			executing = true;
			requestAnimationFrame(() => {
				executing = true;
				for (var i: number = 0; i < queuedList.length; i++) {
					queuedList[i]();
				}
				queuedList = [];
				executing = false;
			});
		}
	}
}