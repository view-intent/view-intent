export interface IPersistent<T> {
    persistInput(data: T): Promise<void>;
    persistOutput(): T;
}
export declare namespace Persistent {
    function init(stateRootName: string, persistentInstance: IPersistent<any>): void;
}
export default Persistent;
