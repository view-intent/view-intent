export namespace StateStoreStore {
	export let stateStoreStore: { [stateName: string ]: (value: any) => void; } = {  };
	export function registerStore<TStoreType>(storeName: string, store: TStoreType) {
		this.stateStoreStore = store;
	}
}
