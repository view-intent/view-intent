import { Generic } from "./generic";
import { Exclude } from "class-transformer";

@Exclude()
export abstract class RootStore extends Generic {
  
}
export default RootStore;
