export declare namespace StateStoreStore {
    let stateStoreStore: {
        [stateName: string]: (value: any) => void;
    };
    function registerStore<TStoreType>(storeName: string, store: TStoreType): void;
}
