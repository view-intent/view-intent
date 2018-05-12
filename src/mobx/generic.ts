import { action, observable, computed, observe, ObservableMap, toJS } from "mobx";
import { RootStore } from "./main";
import { Is, Reflection } from "utility-collection";
import { Exclude, classToPlainFromExist, TransformClassToPlain, classToPlain } from "class-transformer";
import { cloneDeep, clone } from "lodash";

export abstract class Generic {
  [fieldName: string]: any;
  @Exclude()
  @observable public viParent?: any = null;
  // @Exclude()
  @observable private viUpVersion: number = 0;
  @Exclude()
  private updateSchedule: boolean = false;
  public constructor(parent: any = null) {
    this.update = this.update.bind(this);
    this.setParent = this.setParent.bind(this);
    this.setParent(parent);
    observe(this, () => {
      this.update();
    });
  }
  public setParent(parent: any): void {
    this.viParent = parent;
  }
  public toObject(exclude: string[] = []): { [key: string]: any } {
    const newThis = cloneDeep(toJS(this));
    delete newThis.rootStore;
    delete newThis.viParent;
    delete newThis.setParent;
    // delete newThis.update;
    delete newThis.viUpVersion;
    for (const key in newThis) {
      if (newThis.hasOwnProperty(key)) {
        const prop = newThis[key];
        if (prop.hasOwnProperty("toObject")) {
          newThis[key] = newThis[key].toObject(exclude);
        } else if (typeof prop === "function") {
          delete newThis[key];
        }
      }
    }
    exclude.forEach((key) => {
      delete newThis[key];
    });
    const simpleObj = classToPlainFromExist({}, newThis, { enableCircularCheck: true });
    return simpleObj;
  }
  @action public setField(fieldName: string, value: any) {
    this[fieldName] = value;
  }
  @action public update(level: number = 0): void {
    if (!this.updateSchedule) {
      this.updateSchedule = true;
      setImmediate(() => {
        this.viUpVersion = this.viUpVersion + 1;
        if (!Is.nullOrUndefined(this.viParent) && level < 20) {
          level = level + 1;
          // console.log("update", level);
          this.viParent.update(level);
        }
        this.updateSchedule = false;
      });
    }
  }
}
export default Generic;
