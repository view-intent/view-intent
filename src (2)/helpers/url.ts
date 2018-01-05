export module Helper {
	export class Url {
		private staticPath?: string | null;
		private staticQuery?: string | null;
		private staticHash?: string | null;
		// -------------------
		public QueryList?: { [key: string]: string } = {};
		// -------------------
		public constructor(url: string) {
			this.staticPath = url.split('#')[0].split('?')[0];
			this.staticQuery = url.indexOf('?') > -1 ? url.split('?')[1].split('#')[0] : null;
			this.staticHash = url.split('#')[1] || null;
			// queryList
			if (this.staticQuery != null) {
				let queryKeyValueList = this.staticQuery.split('&');
				queryKeyValueList.forEach(queryKeyValue => {
					let keyValue = queryKeyValue.split('=');
					let key = keyValue[0];
					let value = keyValue[1];
					this.QueryList[key] = value;
				});
			}
		}
		public setQuery(key: string, value: string) : Url {
			this.QueryList[key] = value;
			return this;
		}
		public getQuery(key: string) {
			return this.QueryList[key];
		}
		public toString() {
			let queryLength = Object.keys(this.QueryList).length;
			let query = (Object.keys(this.QueryList).length > 0 ? "?" : "");
			for (var key in this.QueryList) {
				queryLength--;
				if (this.QueryList.hasOwnProperty(key)) {
					var value = this.QueryList[key];
					query = query + key + "=" + value;
					if (queryLength > 0) {
						query = query + "&";
					}
				}
			}
			return this.staticPath + query + (this.staticHash ? this.staticHash : "");
		}
	}
	export module Url {

	}

}
export default Helper.Url;
