import { RootStore } from "./root-store";
import { Exclude } from "class-transformer";
import { Is } from "utility-collection";
import { Generic } from "./generic";

export abstract class Store<T> extends Generic {
  // [key: string]: any;
  @Exclude()
  public rootStore: RootStore | undefined;
  public constructor(rootStore?: RootStore) {
    super(rootStore);
    this.setParent.bind(this);
    this.setParent(rootStore);
  }
  public setParent(rootStore: any): void {
    super.setParent(rootStore);
    this.rootStore = rootStore;
  }
}
export default Store;
