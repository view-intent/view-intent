import { IIntent } from "./main-types";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ViewFrame } from "./view-frame";

export namespace ViewRoot {
	export function htmlInit(intent: IIntent, element: string | HTMLElement) {
		setImmediate(() => {
			let rootElement: HTMLElement = element as HTMLElement;
			if ( typeof element === "string" ) {
				rootElement = document.getElementById(element as string) as HTMLElement;
			}
			ReactDOM.render(<ViewFrame stack="z" className="root" root={true} />, rootElement);
			// console.log("view-intent");
		});
	}
}
export default ViewRoot;
