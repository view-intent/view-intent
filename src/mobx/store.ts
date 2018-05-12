import { action, observable, computed, observe, ObservableMap } from "mobx";
import { RootStore } from "./main";
import { Exclude } from "class-transformer";
import { Is } from "utility-collection";
import { Generic } from "./generic";

export abstract class Store<T> extends Generic {
  [key: string]: any;

  @Exclude()
  @observable public rootStore: RootStore | undefined;
  // @observable public viUpVersion: number = 0;
  public constructor(rootStore?: RootStore) {
    super(rootStore);
    this.setParent = this.setParent.bind(this);
    this.setParent(rootStore);
  }
  public setParent(rootStore: any): void {
    super.setParent(rootStore);
    this.rootStore = rootStore;
  }

  // @action public update(): void {
  // 	this.viupversion++;
  // 	if (!Is.nullOrUndefined( this.rootStore)) {
  // 		this.rootStore.update();
  // 	}
  // 	if (!Is.nullOrUndefined( this.viParent)) {
  // 		this.viParent.update();
  // 	}
  // }
}
export default Store;
