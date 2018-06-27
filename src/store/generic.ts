// import { action, observable, computed, observe, ObservableMap, toJS } from "mobx";
import { RootStore } from "./root-store";
import { Is, Reflection } from "utility-collection";
import {
  Exclude,
  classToPlainFromExist,
  TransformClassToPlain,
  classToPlain,
  classToClass,
  classToClassFromExist,
  ClassTransformer,
  ClassTransformOptions,
  deserialize,
  deserializeArray,
  ExcludeOptions,
  Expose,
  ExposeOptions,
  plainToClass,
  plainToClassFromExist,
  serialize,
  Transform,
  TransformationType,
  TransformClassToClass,
  TransformOptions,
  Type,
  TypeOptions,
} from "class-transformer";
import { Observable } from "abstract-observable";

export abstract class Generic extends Observable {
  // [fieldName: string]: any;
  public parent?: Generic;
  public constructor(parent?: Generic) {
    super(parent);
    this.parent = parent;
    this.setField.bind(this);
  }
  public setField(fieldName: string, value: any) {
    this[fieldName] = value;
  }
}
export default Generic;
