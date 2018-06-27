import { IIntent } from "./types";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ViewFrame } from "./view-frame";
// import { AppContainer  } from "react-hot-loader";

export class ViewRoot { }
export namespace ViewRoot {
  export function htmlInit(intent: IIntent, element: string | HTMLElement, hotLoader: boolean = true) {
    setImmediate(() => {
      let rootElement: HTMLElement = element as HTMLElement;
      if (typeof element === "string") {
        rootElement = document.getElementById(element as string) as HTMLElement;
      }
      ReactDOM.render(<ViewFrame id="root" className="root" root={true} />, rootElement);
    });
  }
}

export default ViewRoot;
