export var StateStoreStore;
(function (StateStoreStore) {
    StateStoreStore.stateStoreStore = {};
    function registerStore(storeName, store) {
        this.stateStoreStore = store;
    }
    StateStoreStore.registerStore = registerStore;
})(StateStoreStore || (StateStoreStore = {}));
//# sourceMappingURL=state-state-store.js.map