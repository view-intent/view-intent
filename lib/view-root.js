import * as React from "react";
import * as ReactDOM from "react-dom";
import { ViewFrame } from "./view-frame";
export class ViewRoot {
}
(function (ViewRoot) {
    function htmlInit(intent, element, hotLoader = true) {
        setImmediate(() => {
            let rootElement = element;
            if (typeof element === "string") {
                rootElement = document.getElementById(element);
            }
            ReactDOM.render(React.createElement(ViewFrame, { className: "root", root: true }), rootElement);
            // if (hotLoader) {
            // 	ReactDOM.render(<HotViewFrame className="root" root={true} />, rootElement);
            // } else {
            // 	ReactDOM.render(<ViewFrame className="root" root={true} />, rootElement);
            // }
        });
    }
    ViewRoot.htmlInit = htmlInit;
})(ViewRoot || (ViewRoot = {}));
export default ViewRoot;
//# sourceMappingURL=view-root.js.map