import { action, observable, computed, observe, ObservableMap } from "mobx";
import { Generic } from "./generic";
import { Exclude } from "class-transformer";
// import { Skip } from "serializer.ts/Decorators";

@Exclude()
export abstract class RootStore extends Generic {
  [key: string]: any;
  // @Skip()
  // public rootStore: RootStore;
}
export default RootStore;
