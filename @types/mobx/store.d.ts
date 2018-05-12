import { RootStore } from "./main";
import { Generic } from "./generic";
export declare abstract class Store<T> extends Generic {
    [key: string]: any;
    rootStore: RootStore | undefined;
    constructor(rootStore?: RootStore);
    setParent(rootStore: any): void;
}
export default Store;
